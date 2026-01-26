// Production/Dev URI
const PRODUCT_URI = "https://recba.me";
const LOCAL_URI = "https://dev.recba.me";

// Determine Environment
export const BASE_URL = __DEV__ ? LOCAL_URI : PRODUCT_URI;
// export const BASE_URL = PRODUCT_URI;

export const REQUEST_TIMEOUT_MS = 5000;

/**
 * API Path Prefix Configuration
 * Production (Release Build) -> /api/v2
 * Development (Debug Build) -> /api/v2
 */
export const API_PREFIX = "/api/v2";
