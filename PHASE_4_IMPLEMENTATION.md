I have completed the requested changes.

1.  **Modified `src/stores/emailStore.ts`**:
    -   Added a `refreshing` state to differentiate between initial loading (blocking) and background updates (non-blocking).
    -   Updated `fetchEmails` to handle this new state.
    -   Updated `setFolder` and `startSync` to always fetch from the local database first (fast) before triggering a network sync (background).
    -   Added `syncOtherFolders` to fetch 'Sent', 'Drafts', 'Trash', and 'Spam' in parallel during the initial sync.

2.  **Modified `src/components/EmailList/EmailList.tsx`**:
    -   Added a minimal sticky progress bar at the top of the list that appears when `refreshing` is true, indicating background activity without blocking the UI.

3.  **Modified `src/App.tsx`**:
    -   Updated the UI to respect the new `refreshing` state, ensuring the refresh button spin state reflects background syncing.

Now, when you enter "Classic Mode" or switch folders:
-   Emails from the database will load immediately.
-   A thin loading line will appear at the top of the list while the app checks for new emails.
-   Other folders (Sent, Drafts, etc.) will be synced in the background.

I verified the changes by running the build and type checking.