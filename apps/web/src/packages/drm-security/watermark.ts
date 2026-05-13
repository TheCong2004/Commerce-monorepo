/**
 * Watermark utilities for media protection
 */

export interface OverlayWatermarkConfig {
    imageUrl: string;
    opacity?: number; // 0-1
    position?: 'right' | 'center' | 'full' | 'bottom-right';
    backdropBlur?: string; // e.g. 'blur(2px)'
    backgroundColor?: string; // e.g. 'rgba(255, 255, 255, 0.7)'
    width?: string; // e.g. '30%'
    height?: string; // e.g. '100%'
    zIndex?: number;
}

export class WatermarkManager {
    /**
     * Generate watermark canvas for images
     */
    static generateWatermark(
        width: number,
        height: number,
        text: string = "© Proprietary Content",
        opacity: number = 0.3
    ): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return canvas;

        // Semi-transparent background
        ctx.globalAlpha = opacity;
        ctx.font = `${Math.min(width, height) / 15}px Arial`;
        ctx.fillStyle = "rgba(128, 128, 128, 1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw watermark text diagonally
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate((-Math.PI / 4));
        ctx.fillText(text, 0, 0);
        ctx.restore();

        return canvas;
    }

    /**
     * Apply watermark to image
     */
    static async applyWatermarkToImage(
        imageSrc: string,
        watermarkText: string = "© Proprietary Content",
        watermarkOpacity: number = 0.3
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve(imageSrc);
                    return;
                }

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Draw watermark
                const watermark = this.generateWatermark(
                    img.width,
                    img.height,
                    watermarkText,
                    watermarkOpacity
                );
                ctx.drawImage(watermark, 0, 0);

                // Return watermarked image
                resolve(canvas.toDataURL());
            };

            img.onerror = () => {
                reject(new Error("Failed to load image"));
            };

            img.src = imageSrc;
        });
    }

    /**
     * Create repeating watermark pattern
     */
    static generatePatternWatermark(
        width: number,
        height: number,
        text: string = "© Proprietary Content",
        spacing: number = 200,
        opacity: number = 0.15
    ): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return canvas;

        ctx.globalAlpha = opacity;
        ctx.font = "14px Arial";
        ctx.fillStyle = "rgba(128, 128, 128, 1)";

        // Draw repeating watermark across entire canvas
        for (let x = -width; x < width * 2; x += spacing) {
            for (let y = -height; y < height * 2; y += spacing) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((-Math.PI / 6)); // 30 degrees
                ctx.fillText(text, 0, 0);
                ctx.restore();
            }
        }

        return canvas;
    }

    /**
     * Apply pattern watermark to image
     */
    static async applyPatternWatermark(
        imageSrc: string,
        text: string = "© Proprietary Content",
        spacing: number = 200,
        opacity: number = 0.15
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve(imageSrc);
                    return;
                }

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Draw pattern watermark
                const watermark = this.generatePatternWatermark(
                    img.width,
                    img.height,
                    text,
                    spacing,
                    opacity
                );
                ctx.drawImage(watermark, 0, 0);

                resolve(canvas.toDataURL());
            };

            img.onerror = () => {
                reject(new Error("Failed to load image"));
            };

            img.src = imageSrc;
        });
    }

    /**
     * Generate overlay watermark element (mauhopdong.vn style)
     * Perfect for PDF viewers and document protection
     */
    static generateOverlayWatermark(config: OverlayWatermarkConfig): HTMLElement {
        const {
            imageUrl,
            opacity = 1,
            position = "right",
            backdropBlur = "blur(2px)",
            backgroundColor = "rgba(255, 255, 255, 0.7)",
            width = position === "right" ? "30%" : "100%",
            height = "100%",
            zIndex = 10,
        } = config;

        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 w-full h-full select-none pointer-events-none";
        overlay.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            ms-user-select: none;
            pointer-events: none;
        `;

        // Watermark container
        const container = document.createElement("div");
        const positionStyles: { [key: string]: string } = {
            right: `right: 0; width: ${width}; height: ${height};`,
            center: `left: 50%; transform: translateX(-50%); width: ${width}; height: ${height};`,
            full: `inset: 0; width: 100%; height: 100%;`,
            "bottom-right": `bottom: 0; right: 0; width: ${width}; height: ${width};`,
        };

        container.style.cssText = `
            position: absolute;
            ${positionStyles[position]}
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            background: ${backgroundColor};
            backdrop-filter: ${backdropBlur};
            -webkit-backdrop-filter: ${backdropBlur};
            z-index: ${zIndex};
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
            opacity: ${opacity};
        `;

        // Watermark image
        const img = document.createElement("img");
        img.src = imageUrl;
        img.style.cssText = `
            height: 100%;
            width: auto;
            object-fit: cover;
            user-select: none;
            pointer-events: none;
            opacity: ${opacity};
        `;
        img.alt = "watermark";

        container.appendChild(img);
        overlay.appendChild(container);

        return overlay;
    }

    /**
     * Apply overlay watermark to an element (mauhopdong.vn style)
     */
    static applyOverlayWatermark(
        parentElement: HTMLElement,
        config: OverlayWatermarkConfig
    ): HTMLElement {
        const watermarkElement = this.generateOverlayWatermark(config);
        parentElement.appendChild(watermarkElement);
        return watermarkElement;
    }

    /**
     * Generate dynamic overlay watermark with text (e.g., user info)
     */
    static generateDynamicOverlayWatermark(config: OverlayWatermarkConfig & {
        text?: string;
        textColor?: string;
        textSize?: string;
        showDate?: boolean;
        showUserInfo?: { email?: string; name?: string };
    }): HTMLElement {
        const {
            imageUrl,
            text,
            textColor = "rgba(0, 0, 0, 0.3)",
            textSize = "12px",
            showDate = false,
            showUserInfo,
        } = config;

        const overlay = this.generateOverlayWatermark(config);
        const container = overlay.querySelector("div:last-child") as HTMLElement;

        if (container && (text || showDate || showUserInfo)) {
            const textContainer = document.createElement("div");
            textContainer.style.cssText = `
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: ${textSize};
                color: ${textColor};
                font-family: Arial, sans-serif;
                text-align: right;
                line-height: 1.4;
                pointer-events: none;
                user-select: none;
            `;

            let textContent = "";
            if (text) textContent += `${text}<br/>`;
            if (showUserInfo?.name) textContent += `${showUserInfo.name}<br/>`;
            if (showUserInfo?.email) textContent += `${showUserInfo.email}<br/>`;
            if (showDate) textContent += new Date().toLocaleString();

            textContainer.innerHTML = textContent.replace(/<br\/>$/i, "");
            container.appendChild(textContainer);
        }

        return overlay;
    }
}
