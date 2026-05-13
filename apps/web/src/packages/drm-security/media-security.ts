/**
 * Main Media Security Manager
 * Orchestrates all media security features
 */

import { MediaSecurityConfig, MediaAccessToken, SecureMediaResult } from "./types";
import { MediaValidator } from "./validators";
import { TokenManager } from "./tokens";
import { WatermarkManager, type OverlayWatermarkConfig } from "./watermark";
import { EncryptionManager } from "./encryption";
import { AntiCopyProtection } from "./anti-copy";


export class MediaSecurityManager {
    private config: MediaSecurityConfig;
    private tokenManager: TokenManager;

    constructor(config: Partial<MediaSecurityConfig> = {}) {
        this.config = {
            enableWatermark: true,
            watermarkText: "© Proprietary Content",
            watermarkOpacity: 0.3,
            enableEncryption: true,
            restrictDownload: true,
            restrictCopy: true,
            restrictScreenshot: true,
            expirationDays: 30,
            ...config,
        };

        this.tokenManager = new TokenManager(this.config.expirationDays || 30);
    }

    /**
     * Get token manager instance
     */
    getTokenManager(): TokenManager {
        return this.tokenManager;
    }

    /**
     * Validate media file
     */
    validateMedia(file: File | Blob, mediaType: "image" | "video") {
        return MediaValidator.validateMedia(file, mediaType);
    }

    /**
     * Generate access token
     */
    generateAccessToken(
        userId: string,
        mediaId: string,
        maxViews?: number
    ): MediaAccessToken {
        return this.tokenManager.generateAccessToken(userId, mediaId, maxViews);
    }

    /**
     * Apply watermark to image
     */
    async applyWatermark(imageSrc: string): Promise<string> {
        if (!this.config.enableWatermark) {
            return imageSrc;
        }

        return WatermarkManager.applyWatermarkToImage(
            imageSrc,
            this.config.watermarkText,
            this.config.watermarkOpacity
        );
    }

    /**
     * Get security CSS styles
     */
    getSecurityCSS(): string {
        const css: string[] = [];

        if (this.config.restrictDownload) {
            css.push("pointer-events: none;");
        }

        if (this.config.restrictCopy) {
            css.push("user-select: none; -webkit-user-select: none;");
        }

        if (this.config.restrictScreenshot) {
            css.push("filter: brightness(0.98);");
        }

        return css.join(" ");
    }

    /**
     * Get secure media with all protections applied
     */
    async getSecureMedia(
        mediaUrl: string,
        mediaType: "image" | "video",
        accessToken: string
    ): Promise<SecureMediaResult> {
        // Verify token
        const tokenValid = this.tokenManager.verifyAccessToken(accessToken);
        if (!tokenValid.isValid) {
            throw new Error(tokenValid.reason || "Access denied");
        }

        // Increment view count
        this.tokenManager.incrementViewCount(accessToken);

        // Apply watermark if image
        let secureUrl = mediaUrl;
        if (mediaType === "image" && this.config.enableWatermark) {
            secureUrl = await this.applyWatermark(mediaUrl);
        }

        return {
            url: secureUrl,
            css: this.getSecurityCSS(),
            token: accessToken,
        };
    }

    /**
     * Apply anti-copy protection to element
     */
    applyAntiCopyProtection(element: HTMLElement): () => void {
        return AntiCopyProtection.applyProtection(element);
    }

    /**
     * Setup auto anti-copy protection
     */
    setupAutoAntiCopyProtection(
        selector: string = ".rpv-core__viewer",
        retryDelay: number = 100
    ): () => void {
        return AntiCopyProtection.setupAutoProtection(selector, retryDelay);
    }

    /**
     * Encrypt media URL
     */
    encryptMediaUrl(mediaUrl: string, key: string): string {
        if (!this.config.enableEncryption) {
            return mediaUrl;
        }

        return EncryptionManager.encryptMediaUrl(mediaUrl, key);
    }

    /**
     * Decrypt media URL
     */
    decryptMediaUrl(encryptedUrl: string): string {
        if (!this.config.enableEncryption) {
            return encryptedUrl;
        }

        return EncryptionManager.decryptMediaUrl(encryptedUrl);
    }

    /**
     * Get configuration
     */
    getConfig(): MediaSecurityConfig {
        return { ...this.config };
    }

    /**
     * Update configuration
     */
    updateConfig(config: Partial<MediaSecurityConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * Apply overlay watermark (mauhopdong.vn style)
     */
    applyOverlayWatermark(
        parentElement: HTMLElement,
        imageUrl: string,
        options?: Partial<Parameters<typeof WatermarkManager.applyOverlayWatermark>[1]>
    ): HTMLElement {
        if (!this.config.enableWatermark) {
            return new DocumentFragment() as any;
        }

        return WatermarkManager.applyOverlayWatermark(parentElement, {
            imageUrl,
            opacity: this.config.watermarkOpacity,
            ...options,
        });
    }

    /**
     * Apply dynamic overlay watermark with user info
     */
    applyDynamicOverlayWatermark(
        parentElement: HTMLElement,
        imageUrl: string,
        options?: Partial<Parameters<typeof WatermarkManager.generateDynamicOverlayWatermark>[0]>
    ): HTMLElement {
        if (!this.config.enableWatermark) {
            return new DocumentFragment() as any;
        }

        const watermark = WatermarkManager.generateDynamicOverlayWatermark({
            imageUrl,
            opacity: this.config.watermarkOpacity,
            ...options,
        });

        parentElement.appendChild(watermark);
        return watermark;
    }

    /**
     * Protect PDF viewer element
     */
    protectPDFViewer(viewerElement: HTMLElement): () => void {
        if (!this.config.restrictCopy) {
            return () => {};
        }

        return AntiCopyProtection.protectPDFViewer(viewerElement);
    }

    /**
     * Get protection CSS for media elements
     */
    getProtectionCSS(): string {
        return AntiCopyProtection.getProtectionCSS();
    }

    /**
     * Create protected wrapper for content
     */
    createProtectedWrapper(
        contentElement: HTMLElement,
        protectionLevel: "light" | "medium" | "strict" = "medium"
    ): HTMLElement {
        return AntiCopyProtection.createProtectedWrapper(contentElement, protectionLevel);
    }
}

// Export singleton instance
export const mediaSecurityManager = new MediaSecurityManager();

// Export class for custom instances
export default MediaSecurityManager;
