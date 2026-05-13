/**
 * Access token management for media security
 */

import { MediaAccessToken } from "./types";

export class TokenManager {
    private accessTokens: Map<string, MediaAccessToken> = new Map();
    private expirationDays: number = 30;

    constructor(expirationDays: number = 30) {
        this.expirationDays = expirationDays;
    }

    /**
     * Generate secure access token for media
     */
    generateAccessToken(
        userId: string,
        mediaId: string,
        maxViews?: number
    ): MediaAccessToken {
        const token = this.generateRandomToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.expirationDays);

        const accessToken: MediaAccessToken = {
            userId,
            mediaId,
            token,
            expiresAt,
            viewCount: 0,
            maxViews,
        };

        this.accessTokens.set(token, accessToken);
        return accessToken;
    }

    /**
     * Verify access token validity
     */
    verifyAccessToken(token: string): { isValid: boolean; reason?: string } {
        const accessToken = this.accessTokens.get(token);

        if (!accessToken) {
            return { isValid: false, reason: "Token not found" };
        }

        if (new Date() > accessToken.expiresAt) {
            this.accessTokens.delete(token);
            return { isValid: false, reason: "Token expired" };
        }

        if (
            accessToken.maxViews &&
            accessToken.viewCount >= accessToken.maxViews
        ) {
            this.accessTokens.delete(token);
            return { isValid: false, reason: "View limit exceeded" };
        }

        return { isValid: true };
    }

    /**
     * Increment view count for token
     */
    incrementViewCount(token: string): void {
        const accessToken = this.accessTokens.get(token);
        if (accessToken) {
            accessToken.viewCount++;
        }
    }

    /**
     * Revoke access token
     */
    revokeAccessToken(token: string): boolean {
        return this.accessTokens.delete(token);
    }

    /**
     * Get token info
     */
    getTokenInfo(token: string): MediaAccessToken | null {
        return this.accessTokens.get(token) || null;
    }

    /**
     * Get all tokens for a user
     */
    getUserTokens(userId: string): MediaAccessToken[] {
        return Array.from(this.accessTokens.values()).filter(
            (token) => token.userId === userId
        );
    }

    /**
     * Revoke all tokens for a user
     */
    revokeUserTokens(userId: string): number {
        const userTokens = this.getUserTokens(userId);
        let count = 0;

        userTokens.forEach((token) => {
            if (this.accessTokens.delete(token.token)) {
                count++;
            }
        });

        return count;
    }

    /**
     * Clean up expired tokens
     */
    cleanupExpiredTokens(): number {
        let count = 0;
        const now = new Date();

        this.accessTokens.forEach((token, key) => {
            if (now > token.expiresAt) {
                this.accessTokens.delete(key);
                count++;
            }
        });

        return count;
    }

    /**
     * Private: Generate random token
     */
    private generateRandomToken(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
