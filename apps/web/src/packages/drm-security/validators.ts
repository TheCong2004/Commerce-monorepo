/**
 * Media validation utilities
 */

import { ValidationResult } from "./types";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VALID_VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB

export class MediaValidator {
    /**
     * Validate media file before serving
     */
    static validateMedia(
        file: File | Blob,
        mediaType: "image" | "video"
    ): ValidationResult {
        const errors: string[] = [];
        const maxSize = mediaType === "image" ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
        const validTypes =
            mediaType === "image" ? VALID_IMAGE_TYPES : VALID_VIDEO_TYPES;

        if (file.size > maxSize) {
            errors.push(
                `File size exceeds ${maxSize / 1024 / 1024}MB limit`
            );
        }

        if (!validTypes.includes(file.type)) {
            errors.push(`Invalid ${mediaType} format: ${file.type}`);
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    /**
     * Validate image file
     */
    static validateImage(file: File | Blob): ValidationResult {
        return this.validateMedia(file, "image");
    }

    /**
     * Validate video file
     */
    static validateVideo(file: File | Blob): ValidationResult {
        return this.validateMedia(file, "video");
    }

    /**
     * Check if media type is image
     */
    static isImage(file: File | Blob): boolean {
        return VALID_IMAGE_TYPES.includes(file.type);
    }

    /**
     * Check if media type is video
     */
    static isVideo(file: File | Blob): boolean {
        return VALID_VIDEO_TYPES.includes(file.type);
    }
}
