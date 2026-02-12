use crate::auth::oauth::refresh_access_token_for_provider;
use crate::auth::storage::{get_account_tokens, get_tokens, store_account_tokens, store_tokens};
use crate::commands::account::AccountManager;
use crate::db::EmailDatabase;
use crate::email::idle::IdleManager;
use crate::email::imap_client::{ImapClient, ImapCredentials};
use crate::email::provider::{EmailProvider, ImapFlag};
use crate::email::server_presets::ServerConfig;
use crate::email::types::{Email, EmailListItem};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tauri::State;

type DbState = Arc<Mutex<Option<EmailDatabase>>>;

/// Statistics for a single folder
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FolderStats {
    pub folder_name: String,
    pub unread_count: u32,
    pub total_count: u32,
}

/// Parse a unified email ID "{account_id}:{folder}:{uid}" into parts
fn parse_email_id(email_id: &str) -> Option<(String, String, u32)> {
    let parts: Vec<&str> = email_id.splitn(3, ':').collect();
    if parts.len() == 3 {
        let uid = parts[2].parse::<u32>().ok()?;
        Some((parts[0].to_string(), parts[1].to_string(), uid))
    } else {
        None
    }
}

/// Resolve OAuth2 credentials for an account, refreshing the token if expired.
async fn resolve_oauth2_credentials(
    account_id: &str,
    email: &str,
    provider: &str,
) -> Result<ImapCredentials, String> {
    let tokens = get_account_tokens(account_id)
        .or_else(|_| get_tokens())
        .map_err(|e| format!("Not authenticated: {}", e))?;

    // Check if token is expired (with 60s buffer to avoid edge-case failures)
    let buffer = chrono::Duration::seconds(60);
    if tokens.expires_at <= Utc::now() + buffer {
        eprintln!("[IMAP:{}] Token expired, refreshing...", account_id);
        if let Some(refresh_token) = &tokens.refresh_token {
            let new_tokens = refresh_access_token_for_provider(
                refresh_token,
                provider,
                Some(account_id),
            )
            .await
            .map_err(|e| format!("Token refresh failed: {}", e))?;

            // Persist refreshed tokens
            let _ = store_account_tokens(account_id, &new_tokens);
            let _ = store_tokens(&new_tokens);

            eprintln!("[IMAP:{}] Token refreshed successfully", account_id);
            return Ok(ImapCredentials::OAuth2 {
                user: email.to_string(),
                access_token: new_tokens.access_token,
            });
        } else {
            return Err("Token expired and no refresh token available. Please re-authenticate.".to_string());
        }
    }

    Ok(ImapCredentials::OAuth2 {
        user: email.to_string(),
        access_token: tokens.access_token,
    })
}

/// Get or create an ImapClient for the active account.
/// For OAuth2 accounts, automatically refreshes expired tokens and recreates the client.
async fn get_active_client(
    db: &DbState,
    account_manager: &AccountManager,
) -> Result<Arc<tokio::sync::Mutex<ImapClient>>, String> {
    // Get active account from DB
    let account = {
        let db_lock = db.lock().unwrap();
        let database = db_lock.as_ref().ok_or("Database not initialized")?;
        database
            .get_active_account()
            .map_err(|e| e.to_string())?
            .ok_or("No active account. Please add an account first.")?
    };

    // For OAuth2 accounts, check token expiry even if client is cached
    if account.auth_type == "oauth2" {
        let tokens = get_account_tokens(&account.id)
            .or_else(|_| get_tokens())
            .ok();

        let is_expired = tokens
            .as_ref()
            .map(|t| t.expires_at <= Utc::now() + chrono::Duration::seconds(60))
            .unwrap_or(true);

        if is_expired {
            // Remove stale client so we recreate with fresh token
            account_manager.remove_client(&account.id);
        }
    }

    // Return cached client if it exists
    if let Some(client) = account_manager.get_client(&account.id) {
        return Ok(client);
    }

    // Create a new client with fresh credentials
    let provider_str = match account.provider_type() {
        crate::email::server_presets::ProviderType::Gmail => "gmail",
        crate::email::server_presets::ProviderType::Outlook => "microsoft",
        _ => "gmail",
    };

    let credentials = if account.auth_type == "oauth2" {
        resolve_oauth2_credentials(&account.id, &account.email, provider_str).await?
    } else {
        let password = crate::auth::storage::get_app_password(&account.id)
            .map_err(|e| format!("No password for account: {}", e))?;
        ImapCredentials::Password {
            user: account.email.clone(),
            password,
        }
    };

    let server_config = ServerConfig {
        imap_host: account.imap_host.clone(),
        imap_port: account.imap_port,
        smtp_host: account.smtp_host.clone(),
        smtp_port: account.smtp_port,
        use_tls: true,
    };

    let client = ImapClient::new(
        account.id.clone(),
        account.email.clone(),
        account.provider_type(),
        server_config,
        credentials,
    );

    account_manager.add_client(account.id.clone(), client);

    account_manager
        .get_client(&account.id)
        .ok_or_else(|| "Failed to store client".to_string())
}

/// Map frontend folder name (lowercase) to IMAP folder name (capitalized)
fn map_folder_name(folder: &str) -> &str {
    match folder.to_lowercase().as_str() {
        "inbox" => "INBOX",
        "sent" => "Sent",
        "drafts" => "Drafts",
        "trash" => "Trash",
        "spam" => "Spam",
        _ => folder, // Pass through unknown folders as-is
    }
}

#[tauri::command]
pub async fn fetch_emails(
    db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    max_results: Option<u32>,
    query: Option<String>,
    force_refresh: Option<bool>,
    folder: Option<String>,
) -> Result<Vec<EmailListItem>, String> {
    let should_refresh = force_refresh.unwrap_or(false);
    let imap_folder = folder
        .as_deref()
        .map(map_folder_name)
        .unwrap_or("INBOX");

    // Try cache first if not forcing refresh
    if !should_refresh {
        let db_lock = db.lock().unwrap();
        if let Some(database) = db_lock.as_ref() {
            if let Ok(cached_emails) =
                database.get_cached_emails(imap_folder, max_results.unwrap_or(50) as i64)
            {
                if !cached_emails.is_empty() {
                    return Ok(cached_emails);
                }
            }
        }
    }

    // Fetch via IMAP client
    let client_arc = get_active_client(&db, &account_manager).await?;
    let client = client_arc.lock().await;
    let items = client
        .list_messages(imap_folder, max_results.unwrap_or(50), 0)
        .await
        .map_err(|e| e.to_string())?;

    // Cache the emails we fetched (fetch full for caching)
    for item in &items {
        if let Some((_, folder, uid)) = parse_email_id(&item.id) {
            match client.get_message(&folder, uid).await {
                Ok(email) => {
                    let db_lock = db.lock().unwrap();
                    if let Some(database) = db_lock.as_ref() {
                        let _ = database.store_email(&email);
                    }
                }
                Err(e) => eprintln!("Failed to fetch message uid={}: {}", uid, e),
            }
        }
    }

    Ok(items)
}

#[tauri::command]
pub async fn get_email(
    db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    email_id: String,
) -> Result<Email, String> {
    // Try IMAP path: parse the composite ID
    if let Some((account_id, folder, uid)) = parse_email_id(&email_id) {
        if let Some(client_arc) = account_manager.get_client(&account_id) {
            let client = client_arc.lock().await;
            return client
                .get_message(&folder, uid)
                .await
                .map_err(|e| e.to_string());
        }
    }

    // Fallback: try database cache
    {
        let db_lock = db.lock().unwrap();
        if let Some(database) = db_lock.as_ref() {
            if let Ok(Some(email)) = database.get_email_by_id(&email_id) {
                return Ok(email);
            }
        }
    }

    Err(format!("Email not found: {}", email_id))
}

#[tauri::command]
pub async fn send_email(
    db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    to: Vec<String>,
    subject: String,
    body: String,
    cc: Option<Vec<String>>,
    bcc: Option<Vec<String>>,
) -> Result<String, String> {
    // Send via IMAP/SMTP
    let client_arc = get_active_client(&db, &account_manager).await?;
    let client = client_arc.lock().await;
    client
        .send_email(
            &client.email,
            to,
            cc.unwrap_or_default(),
            bcc.unwrap_or_default(),
            &subject,
            &body,
            "", // plain text version
        )
        .await
        .map_err(|e| e.to_string())?;
    Ok("sent".to_string())
}

#[tauri::command]
pub async fn mark_email_read(
    _db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    email_id: String,
    read: bool,
) -> Result<(), String> {
    let (account_id, folder, uid) = parse_email_id(&email_id)
        .ok_or_else(|| format!("Invalid email ID: {}", email_id))?;
    let client_arc = account_manager
        .get_client(&account_id)
        .ok_or_else(|| format!("No client for account: {}", account_id))?;
    let client = client_arc.lock().await;
    client
        .set_flags(&folder, uid, &[ImapFlag::Seen], read)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn star_email(
    _db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    email_id: String,
    starred: bool,
) -> Result<(), String> {
    let (account_id, folder, uid) = parse_email_id(&email_id)
        .ok_or_else(|| format!("Invalid email ID: {}", email_id))?;
    let client_arc = account_manager
        .get_client(&account_id)
        .ok_or_else(|| format!("No client for account: {}", account_id))?;
    let client = client_arc.lock().await;
    client
        .set_flags(&folder, uid, &[ImapFlag::Flagged], starred)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn trash_email(
    _db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    email_id: String,
) -> Result<(), String> {
    let (account_id, folder, uid) = parse_email_id(&email_id)
        .ok_or_else(|| format!("Invalid email ID: {}", email_id))?;
    let client_arc = account_manager
        .get_client(&account_id)
        .ok_or_else(|| format!("No client for account: {}", account_id))?;
    let client = client_arc.lock().await;
    // Move to Trash folder
    client
        .move_message(&folder, uid, "Trash")
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn archive_email(
    _db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
    email_id: String,
) -> Result<(), String> {
    let (account_id, folder, uid) = parse_email_id(&email_id)
        .ok_or_else(|| format!("Invalid email ID: {}", email_id))?;
    let client_arc = account_manager
        .get_client(&account_id)
        .ok_or_else(|| format!("No client for account: {}", account_id))?;
    let client = client_arc.lock().await;
    // Move to Archive folder
    client
        .move_message(&folder, uid, "Archive")
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn start_idle_monitoring(
    app: tauri::AppHandle,
    db: State<'_, DbState>,
    idle_manager: State<'_, IdleManager>,
) -> Result<(), String> {
    let account = {
        let db_lock = db.lock().unwrap();
        let database = db_lock.as_ref().ok_or("Database not initialized")?;
        database
            .get_active_account()
            .map_err(|e| e.to_string())?
            .ok_or("No active account")?
    };

    let server_config = ServerConfig {
        imap_host: account.imap_host.clone(),
        imap_port: account.imap_port,
        smtp_host: account.smtp_host.clone(),
        smtp_port: account.smtp_port,
        use_tls: true,
    };

    idle_manager
        .start_idle(
            app,
            account.id.clone(),
            account.email.clone(),
            account.provider_type(),
            server_config,
            account.auth_type.clone(),
        )
        .await;

    Ok(())
}

#[tauri::command]
pub async fn stop_idle_monitoring(
    db: State<'_, DbState>,
    idle_manager: State<'_, IdleManager>,
) -> Result<(), String> {
    let account_id = {
        let db_lock = db.lock().unwrap();
        let database = db_lock.as_ref().ok_or("Database not initialized")?;
        database
            .get_active_account()
            .map_err(|e| e.to_string())?
            .map(|a| a.id)
    };

    if let Some(id) = account_id {
        idle_manager.stop_idle(&id).await;
    }

    Ok(())
}

#[tauri::command]
pub async fn get_folder_stats(
    db: State<'_, DbState>,
    account_manager: State<'_, AccountManager>,
) -> Result<Vec<FolderStats>, String> {
    // Get active client
    let client_arc = get_active_client(&db, &account_manager).await?;
    let client = client_arc.lock().await;

    // List of folders to get stats for
    let folders = ["INBOX", "Sent", "Drafts", "Trash", "Spam"];
    let mut stats = Vec::new();

    for folder in &folders {
        match client.get_folder_stats(folder).await {
            Ok((total_count, unread_count)) => {
                stats.push(FolderStats {
                    folder_name: folder.to_string(),
                    unread_count,
                    total_count,
                });
            }
            Err(e) => {
                // Log error but continue with other folders
                eprintln!("Failed to get stats for folder {}: {}", folder, e);
                // Add zero counts for failed folders
                stats.push(FolderStats {
                    folder_name: folder.to_string(),
                    unread_count: 0,
                    total_count: 0,
                });
            }
        }
    }

    Ok(stats)
}