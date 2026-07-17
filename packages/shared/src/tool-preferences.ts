/**
 * Device-local web search preference. Web persists it in localStorage and
 * mobile in SecureStore, so the key is shared but the storage is not.
 */
export const WEB_SEARCH_ENABLED_STORAGE_KEY = "overtchat_web_search_enabled";

export const DEFAULT_WEB_SEARCH_ENABLED = true;

/**
 * Device-local enter-to-send preference. Web persists it in localStorage and
 * mobile in SecureStore, so the key is shared but the storage is not.
 */
export const ENTER_TO_SEND_STORAGE_KEY = "overtchat.enterToSend";

export const DEFAULT_ENTER_TO_SEND = true;
