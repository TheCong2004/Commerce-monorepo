/**
 * Encryption utilities for media URLs
 */

export class EncryptionManager {
    /**
     * Encrypt media URL using base64 encoding
     * Note: For production, use proper encryption like TweetNaCl.js or crypto-js
     */
    static encryptMediaUrl(mediaUrl: string, key: string): string {
        const data = `${mediaUrl}:${key}`;
        return btoa(data);
    }

    /**
     * Decrypt media URL
     */
    static decryptMediaUrl(encryptedUrl: string): string {
        try {
            const decoded = atob(encryptedUrl);
            return decoded.split(":")[0];
        } catch {
            throw new Error("Failed to decrypt URL");
        }
    }

    /**
     * Generate encryption key
     */
    static generateEncryptionKey(length: number = 32): string {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (let i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }

    /**
     * Hash string using SHA-256
     * Requires crypto-js or similar library
     */
    static async hashString(str: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    }

    /**
     * Verify hashed data
     */
    static async verifyHash(str: string, hash: string): Promise<boolean> {
        const computedHash = await this.hashString(str);
        return computedHash === hash;
    }

    /**
     * Create signed token with timestamp
     */
    static createSignedToken(
        data: object,
        secret: string,
        expirationMinutes: number = 60
    ): string {
        const header = { alg: "HS256", typ: "JWT" };
        const payload = {
            ...data,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + expirationMinutes * 60,
        };

        const headerEncoded = btoa(JSON.stringify(header));
        const payloadEncoded = btoa(JSON.stringify(payload));

        // Simple signature (in production, use proper JWT library)
        const signature = btoa(`${headerEncoded}.${payloadEncoded}:${secret}`);

        return `${headerEncoded}.${payloadEncoded}.${signature}`;
    }

    /**
     * Verify signed token
     */
    static verifySignedToken(token: string, secret: string): object | null {
        try {
            const [headerEncoded, payloadEncoded, signatureEncoded] =
                token.split(".");

            // Verify signature
            const expectedSignature = btoa(
                `${headerEncoded}.${payloadEncoded}:${secret}`
            );
            if (signatureEncoded !== expectedSignature) {
                return null;
            }

            // Decode and verify payload
            const payload = JSON.parse(atob(payloadEncoded));

            // Check expiration
            if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
                return null;
            }

            return payload;
        } catch {
            return null;
        }
    }

    /**
     * Obfuscate URL to prevent direct access
     */
    static obfuscateUrl(url: string): string {
        // Simple obfuscation - replace sensitive parts
        return url
            .replace(/https?:\/\//, "")
            .split("")
            .reverse()
            .join("");
    }

    /**
     * Deobfuscate URL
     */
    static deobfuscateUrl(obfuscated: string): string {
        const original = obfuscated.split("").reverse().join("");
        return `https://${original}`;
    }
}
