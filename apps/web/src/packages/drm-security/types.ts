/**
 * Type definitions for media security
 */

export interface MediaSecurityConfig {
    enableWatermark: boolean;
    watermarkText?: string;
    watermarkOpacity?: number;
    enableEncryption: boolean;
    encryptionKey?: string;
    restrictDownload: boolean;
    restrictCopy: boolean;
    restrictScreenshot: boolean;
    expirationDays?: number;
    allowedDomains?: string[];
    maxViewCount?: number;
}

export interface MediaAccessToken {
    userId: string;
    mediaId: string;
    token: string;
    expiresAt: Date;
    viewCount: number;
    maxViews?: number;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export interface SecureMediaResult {
    url: string;
    css: string;
    token: string;
}
