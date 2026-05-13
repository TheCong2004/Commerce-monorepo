
// Main manager
export { mediaSecurityManager, default as MediaSecurityManager } from "./media-security";

// Types
export type { MediaSecurityConfig, MediaAccessToken, ValidationResult, SecureMediaResult } from "./types";

// Validators
export { MediaValidator } from "./validators";

// Tokens
export { TokenManager } from "./tokens";

// Watermark
export { WatermarkManager, type OverlayWatermarkConfig } from "./watermark";

// Encryption
export { EncryptionManager } from "./encryption";

// Anti-copy protection
export { AntiCopyProtection } from "./anti-copy";
