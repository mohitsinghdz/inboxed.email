use crate::auth::storage::{get_account_tokens, get_app_password};
use crate::email::imap_client::{ImapClient, ImapCredentials};
use crate::email::server_presets::{ProviderType, ServerConfig};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tauri::{AppHandle, Emitter};
use tokio::sync::{watch, Mutex};
use tokio::time::{sleep, Duration};

/// Event payload emitted when new mail arrives
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewMailEvent {
    pub account_id: String,
    pub folder: String,
}

/// Manages IMAP IDLE connections for all accounts
pub struct IdleManager {
    /// Per-account-folder shutdown senders (key: "account_id:folder")
    shutdown_senders: Arc<Mutex<HashMap<String, watch::Sender<bool>>>>,
}

/// List of folders to monitor for each account
const MONITORED_FOLDERS: &[&str] = &["INBOX", "Sent", "Drafts", "Trash", "Spam"];

impl IdleManager {
    pub fn new() -> Self {
        Self {
            shutdown_senders: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    /// Start IDLE monitoring for an account (all folders)
    pub async fn start_idle<R: tauri::Runtime>(
        &self,
        app: AppHandle<R>,
        account_id: String,
        email: String,
        provider: ProviderType,
        server_config: ServerConfig,
        auth_type: String,
    ) {
        // Stop existing IDLE connections for this account
        self.stop_idle(&account_id).await;

        // Start IDLE monitoring for each folder
        for folder in MONITORED_FOLDERS {
            self.start_folder_idle(
                app.clone(),
                account_id.clone(),
                email.clone(),
                provider.clone(),
                server_config.clone(),
                auth_type.clone(),
                folder,
            )
            .await;
        }
    }

    /// Start IDLE monitoring for a specific folder
    async fn start_folder_idle<R: tauri::Runtime>(
        &self,
        app: AppHandle<R>,
        account_id: String,
        email: String,
        provider: ProviderType,
        server_config: ServerConfig,
        auth_type: String,
        folder: &str,
    ) {
        let folder_key = format!("{}:{}", account_id, folder);
        let (shutdown_tx, shutdown_rx) = watch::channel(false);

        // Store shutdown sender
        {
            let mut senders = self.shutdown_senders.lock().await;
            senders.insert(folder_key, shutdown_tx);
        }

        let folder = folder.to_string();

        tokio::spawn(async move {
            idle_loop(
                app,
                account_id,
                email,
                provider,
                server_config,
                auth_type,
                folder,
                shutdown_rx,
            )
            .await;
        });
    }

    /// Stop IDLE monitoring for an account (all folders)
    pub async fn stop_idle(&self, account_id: &str) {
        let mut senders = self.shutdown_senders.lock().await;

        // Find and stop all folder monitors for this account
        let keys_to_remove: Vec<String> = senders
            .keys()
            .filter(|k| k.starts_with(&format!("{}:", account_id)))
            .cloned()
            .collect();

        for key in keys_to_remove {
            if let Some(tx) = senders.remove(&key) {
                let _ = tx.send(true);
            }
        }
    }

    /// Stop all IDLE monitors
    pub async fn stop_all(&self) {
        let mut senders = self.shutdown_senders.lock().await;
        for (_, tx) in senders.drain() {
            let _ = tx.send(true);
        }
    }
}

/// The IDLE loop for a single folder in an account
async fn idle_loop<R: tauri::Runtime>(
    app: AppHandle<R>,
    account_id: String,
    email: String,
    provider: ProviderType,
    server_config: ServerConfig,
    auth_type: String,
    folder: String,
    mut shutdown_rx: watch::Receiver<bool>,
) {
    // RFC 2177: IDLE should be re-issued every 29 minutes max
    let idle_timeout_secs = 29 * 60;
    let retry_delay = Duration::from_secs(30);

    loop {
        // Check shutdown
        if *shutdown_rx.borrow() {
            println!("[IDLE:{}:{}] Shutdown signal received", account_id, folder);
            break;
        }

        // Build credentials
        let credentials = if auth_type == "oauth2" {
            match get_account_tokens(&account_id) {
                Ok(tokens) => ImapCredentials::OAuth2 {
                    user: email.clone(),
                    access_token: tokens.access_token,
                },
                Err(e) => {
                    eprintln!(
                        "[IDLE:{}:{}] Failed to get OAuth tokens: {}. Retrying...",
                        account_id, folder, e
                    );
                    sleep(retry_delay).await;
                    continue;
                }
            }
        } else {
            match get_app_password(&account_id) {
                Ok(password) => ImapCredentials::Password {
                    user: email.clone(),
                    password,
                },
                Err(e) => {
                    eprintln!(
                        "[IDLE:{}:{}] Failed to get password: {}. Retrying...",
                        account_id, folder, e
                    );
                    sleep(retry_delay).await;
                    continue;
                }
            }
        };

        let client = ImapClient::new(
            account_id.clone(),
            email.clone(),
            provider.clone(),
            server_config.clone(),
            credentials,
        );

        // Connect
        match client.reconnect().await {
            Ok(()) => {
                println!("[IDLE:{}:{}] Connected, starting IDLE", account_id, folder);
            }
            Err(e) => {
                eprintln!(
                    "[IDLE:{}:{}] Connection failed: {}. Retrying in 30s...",
                    account_id, folder, e
                );
                sleep(retry_delay).await;
                continue;
            }
        }

        // IDLE loop (re-issue every 29 min)
        match client.idle_wait(&folder, idle_timeout_secs).await {
            Ok(true) => {
                // New mail detected
                println!("[IDLE:{}:{}] New mail detected", account_id, folder);
                let _ = app.emit(
                    "email:new_mail",
                    NewMailEvent {
                        account_id: account_id.clone(),
                        folder: folder.clone(),
                    },
                );
            }
            Ok(false) => {
                // Timeout — re-issue IDLE
                println!("[IDLE:{}:{}] IDLE timeout, re-issuing", account_id, folder);
            }
            Err(e) => {
                eprintln!(
                    "[IDLE:{}:{}] IDLE error: {}. Reconnecting in 30s...",
                    account_id, folder, e
                );
                sleep(retry_delay).await;
            }
        }
    }

    println!("[IDLE:{}:{}] IDLE loop exited", account_id, folder);
}
