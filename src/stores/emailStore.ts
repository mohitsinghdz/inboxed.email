import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/core'
import { listen, UnlistenFn } from '@tauri-apps/api/event'
import { useRagStore } from './ragStore'
import { useSmartInboxStore } from './smartInboxStore'

export interface EmailListItem {
  id: string
  thread_id: string
  subject: string
  from: string
  from_email: string
  date: string
  snippet: string
  is_read: boolean
  is_starred: boolean
  has_attachments: boolean
}

export interface Email extends EmailListItem {
  to: string[]
  body_html: string | null
  body_plain: string | null
  labels: string[]
}

interface NewMailEvent {
  account_id: string
  folder: string
}

export interface FolderStats {
  folder_name: string
  total_count: number
  unread_count: number
}

const POLLING_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

interface EmailStore {
  emails: EmailListItem[]
  selectedEmail: Email | null
  currentFolder: string
  folderStats: FolderStats[]
  loading: boolean
  refreshing: boolean
  error: string | null
  pollingInterval: ReturnType<typeof setInterval> | null
  unlistenNewMail: UnlistenFn | null
  fetchEmails: (maxResults?: number, query?: string, forceRefresh?: boolean, folder?: string) => Promise<void>
  syncOtherFolders: () => Promise<void>
  fetchFolderStats: () => Promise<void>
  selectEmail: (emailId: string) => Promise<void>
  clearSelection: () => void
  setFolder: (folder: string) => Promise<void>
  setupNewMailListener: () => Promise<UnlistenFn>
  startSync: () => Promise<void>
  stopSync: () => void
  refreshEmails: () => Promise<void>
}

export const useEmailStore = create<EmailStore>((set, get) => ({
  emails: [],
  selectedEmail: null,
  currentFolder: 'INBOX',
  folderStats: [],
  loading: false,
  refreshing: false,
  error: null,
  pollingInterval: null,
  unlistenNewMail: null,

  fetchEmails: async (maxResults = 50, query, forceRefresh = false, folder) => {
    try {
      const state = get()
      // If we already have emails and this is a refresh, don't show full loader
      if (state.emails.length > 0 && forceRefresh) {
        set({ refreshing: true, error: null })
      } else {
        set({ loading: true, error: null })
      }

      const currentFolder = folder || state.currentFolder
      const emails = await invoke<EmailListItem[]>('fetch_emails', {
        maxResults,
        query,
        forceRefresh,
        folder: currentFolder,
      })
      
      set({ emails, loading: false, refreshing: false })

      // After a force-refresh, re-index new emails in the background
      if (forceRefresh) {
        // Embed any new unembedded emails (incremental - skips already embedded)
        const ragStore = useRagStore.getState()
        if (ragStore.isInitialized && !ragStore.isEmbedding) {
          ragStore.embedAllEmails().catch((e) => {
            console.warn('[EmailStore] Background embedding failed:', e)
          })
        }

        // Re-index for AI insights (smart inbox) if not already indexing
        const smartInboxStore = useSmartInboxStore.getState()
        if (!smartInboxStore.indexingStatus?.is_indexing) {
          smartInboxStore.startIndexing(maxResults).catch((e) => {
            console.warn('[EmailStore] Background indexing failed:', e)
          })
        }
      }
    } catch (error) {
      set({ error: (error as Error).toString(), loading: false, refreshing: false })
    }
  },

  syncOtherFolders: async () => {
    const foldersToSync = ['Sent', 'Drafts', 'Trash', 'Spam']
    try {
      await Promise.all(
        foldersToSync.map((folder) =>
          invoke('fetch_emails', {
            maxResults: 50,
            forceRefresh: true,
            folder,
          })
        )
      )
    } catch (error) {
      console.warn('[EmailStore] Background sync for other folders failed:', error)
    }
  },

  selectEmail: async (emailId: string) => {
    try {
      set({ loading: true, error: null })
      const email = await invoke<Email>('get_email', { emailId })
      set({ selectedEmail: email, loading: false })
    } catch (error) {
      set({ error: (error as Error).toString(), loading: false })
    }
  },

  clearSelection: () => {
    set({ selectedEmail: null })
  },

  setFolder: async (folder: string) => {
    // Clear current emails to avoid showing stale data
    set({ emails: [], selectedEmail: null, currentFolder: folder })
    const state = get()
    // 1. Fetch from DB first (fast)
    await state.fetchEmails(50, undefined, false, folder)
    // 2. Fetch from Network (background)
    state.fetchEmails(50, undefined, true, folder)
  },

  fetchFolderStats: async () => {
    try {
      const stats = await invoke<FolderStats[]>('get_folder_stats')
      set({ folderStats: stats })
    } catch (error) {
      console.warn('[EmailStore] Failed to fetch folder stats:', error)
    }
  },

  setupNewMailListener: async () => {
    const unlisten = await listen<NewMailEvent>('email:new_mail', (event) => {
      console.log('[EmailStore] New mail detected:', event.payload)
      // Auto-refresh email list and folder stats when new mail arrives
      const { fetchEmails, fetchFolderStats } = useEmailStore.getState()
      fetchEmails(50, undefined, true)
      fetchFolderStats()
    })
    return unlisten
  },

  startSync: async () => {
    const state = get()

    // Tear down any existing sync first
    state.stopSync()

    // 1. Load from DB first (immediate feedback)
    await state.fetchEmails(50, undefined, false)

    // 2. Start background sync for current folder
    state.fetchEmails(50, undefined, true)
    
    // 3. Start background sync for other folders
    state.syncOtherFolders()
    
    // 4. Update stats
    await state.fetchFolderStats()

    // 5. Set up the new-mail event listener
    const unlisten = await state.setupNewMailListener()
    set({ unlistenNewMail: unlisten })

    // 6. Start IDLE monitoring
    try {
      await invoke('start_idle_monitoring')
    } catch (e) {
      console.warn('[EmailStore] IDLE monitoring failed to start:', e)
    }

    // 7. Start polling fallback (every 10 minutes)
    const interval = setInterval(() => {
      const { fetchEmails, fetchFolderStats } = useEmailStore.getState()
      fetchEmails(50, undefined, true)
      fetchFolderStats()
    }, POLLING_INTERVAL_MS)
    set({ pollingInterval: interval })
  },

  stopSync: () => {
    const state = get()

    // Clear polling interval
    if (state.pollingInterval) {
      clearInterval(state.pollingInterval)
      set({ pollingInterval: null })
    }

    // Stop IDLE monitoring
    invoke('stop_idle_monitoring').catch((e) => {
      console.warn('[EmailStore] Failed to stop IDLE monitoring:', e)
    })

    // Unlisten new-mail event
    if (state.unlistenNewMail) {
      state.unlistenNewMail()
      set({ unlistenNewMail: null })
    }
  },

  refreshEmails: async () => {
    await get().fetchEmails(50, undefined, true)
  },
}))
