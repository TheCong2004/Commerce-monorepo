/**
 * Anti-copy protection for media elements
 */

export class AntiCopyProtection {
    /**
     * Apply comprehensive anti-copy protection to media element
     * Prevents: copy, cut, paste, right-click, text selection, F12, drag-drop
     */
    static applyProtection(viewerElement: HTMLElement): () => void {
        if (!viewerElement) {
            console.warn(
                "Viewer element not found for anti-copy protection"
            );
            return () => {};
        }

        const handlers: { [key: string]: EventListener } = {};

        // 1. Block dangerous keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
            const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

            // Block Ctrl/Cmd + C, A, X, V (copy, select all, cut, paste)
            if (
                ctrlKey &&
                ["c", "a", "x", "v"].includes(e.key.toLowerCase())
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Block F12 (Dev Tools)
            if (e.key === "F12") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Block Ctrl+Shift+I (Dev Tools)
            if (ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Block Ctrl+Shift+C (Inspect)
            if (ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            return true;
        };

        // 2. Block right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // 3. Block text selection
        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // 4. Block copy and cut operations
        const handleClipboard = (e: ClipboardEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.clipboardData) {
                e.clipboardData.setData("text/plain", "");
                e.clipboardData.setData("text/html", "");
            }
            return false;
        };

        // 5. Block drag and drop
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // 6. Block paste
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // Attach event listeners with capture phase
        handlers["keydown"] = handleKeyDown as unknown as EventListener;
        handlers["contextmenu"] = handleContextMenu as unknown as EventListener;
        handlers["selectstart"] = handleSelectStart as EventListener;
        handlers["copy"] = handleClipboard as unknown as EventListener;
        handlers["cut"] = handleClipboard as unknown as EventListener;
        handlers["dragstart"] = handleDragStart as unknown as EventListener;
        handlers["paste"] = handlePaste as unknown as EventListener;

        Object.entries(handlers).forEach(([event, handler]) => {
            viewerElement.addEventListener(event, handler, true);
        });

        // Apply CSS protections
        this.applyCSSProtection(viewerElement);

        // Disable text layer and annotation layer interactions
        this.disableTextLayers(viewerElement);

        // Return cleanup function
        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                viewerElement.removeEventListener(
                    event,
                    handler,
                    true
                );
            });
        };
    }

    /**
     * Apply CSS protections to prevent text selection and interactions
     */
    private static applyCSSProtection(element: HTMLElement): void {
        const protectedStyle = {
            userSelect: "none" as const,
            WebkitUserSelect: "none" as const,
            MozUserSelect: "none" as const,
            msUserSelect: "none" as const,
            WebkitTouchCallout: "none" as const,
            WebkitHighlight: "none" as const,
        };

        Object.entries(protectedStyle).forEach(([key, value]) => {
            (element.style as any)[key] = value;
        });

        // Add a style tag for deeper CSS control
        const styleId = "anti-copy-styles";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                .protected-media,
                .protected-media * {
                    user-select: none !important;
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    -webkit-touch-callout: none !important;
                    -webkit-highlight: none !important;
                }
                
                .rpv-core__text-layer,
                .rpv-core__annotation-layer {
                    user-select: none !important;
                    -webkit-user-select: none !important;
                    pointer-events: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        element.classList.add("protected-media");
    }

    /**
     * Disable text layer and annotation layer interactions
     * Specific for PDF viewers and similar media players
     */
    private static disableTextLayers(element: HTMLElement): void {
        const selectors = [
            ".rpv-core__text-layer",
            ".rpv-core__annotation-layer",
            ".pdfViewer .page .textLayer",
            ".annotation-layer",
            "[role='doc-noteref']",
        ];

        selectors.forEach((selector) => {
            element.querySelectorAll(selector).forEach((layer) => {
                const el = layer as HTMLElement;
                el.style.userSelect = "none";
                (el.style as any).WebkitUserSelect = "none";
                el.style.pointerEvents = "none";
            });
        });

        // Watch for dynamically added layers
        const observer = new MutationObserver(() => {
            selectors.forEach((selector) => {
                element.querySelectorAll(selector).forEach((layer) => {
                    const el = layer as HTMLElement;
                    el.style.pointerEvents = "none";
                });
            });
        });

        observer.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }

    /**
     * Setup auto-apply anti-copy protection with monitoring
     * Use this in React useEffect or similar lifecycle hooks
     */
    static setupAutoProtection(
        selector: string = ".rpv-core__viewer",
        retryDelay: number = 100
    ): () => void {
        let timeoutId: NodeJS.Timeout | null = null;
        let observer: MutationObserver | null = null;
        const cleanups: Array<() => void> = [];

        const applyProtection = () => {
            const element = document.querySelector(selector) as HTMLElement;
            if (element) {
                const cleanup = this.applyProtection(element);
                cleanups.push(cleanup);
            }
        };

        // Initial attempt
        timeoutId = setTimeout(applyProtection, retryDelay);

        // Watch for DOM changes
        observer = new MutationObserver(applyProtection);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Return cleanup function
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (observer) observer.disconnect();
            cleanups.forEach((cleanup) => cleanup());
        };
    }

    /**
     * Disable all user interactions on element
     */
    static disableInteractions(element: HTMLElement): void {
        element.style.pointerEvents = "none";
        element.style.userSelect = "none";
        (element.style as any).WebkitUserSelect = "none";
    }

    /**
     * Enable user interactions on element
     */
    static enableInteractions(element: HTMLElement): void {
        element.style.pointerEvents = "auto";
        element.style.userSelect = "auto";
        (element.style as any).WebkitUserSelect = "auto";
    }

    /**
     * Protect PDF Viewer (mauhopdong.vn style)
     * Disables text selection and interactions on PDF layers
     */
    static protectPDFViewer(viewerElement: HTMLElement): () => void {
        if (!viewerElement) {
            console.warn("Viewer element not found for PDF protection");
            return () => {};
        }

        const cleanups: Array<() => void> = [];

        // 1. Disable text layer interaction
        const textLayers = viewerElement.querySelectorAll(
            ".rpv-core__text-layer, .textLayer, [role='presentation']"
        );
        textLayers.forEach((layer) => {
            const el = layer as HTMLElement;
            el.style.pointerEvents = "none";
            el.style.userSelect = "none";
            (el.style as any).WebkitUserSelect = "none";
        });

        // 2. Disable annotation layer
        const annotationLayers = viewerElement.querySelectorAll(
            ".rpv-core__annotation-layer, .annotationLayer"
        );
        annotationLayers.forEach((layer) => {
            const el = layer as HTMLElement;
            el.style.pointerEvents = "none";
            el.style.userSelect = "none";
        });

        // 3. Disable canvas right-click
        const canvas = viewerElement.querySelector("canvas");
        if (canvas) {
            const disableContextMenu = (e: Event) => {
                e.preventDefault();
                return false;
            };
            canvas.addEventListener("contextmenu", disableContextMenu as EventListener, true);
            cleanups.push(() => {
                canvas.removeEventListener("contextmenu", disableContextMenu as EventListener, true);
            });
        }

        // 4. Monitor for dynamic layers and disable them
        const observer = new MutationObserver(() => {
            textLayers.forEach((layer) => {
                const el = layer as HTMLElement;
                if (el.style.pointerEvents !== "none") {
                    el.style.pointerEvents = "none";
                    el.style.userSelect = "none";
                }
            });
        });

        observer.observe(viewerElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style", "class"],
        });

        cleanups.push(() => observer.disconnect());

        // Return cleanup function
        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }

    /**
     * Get static CSS protection styles as string
     */
    static getProtectionCSS(): string {
        return `
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-touch-callout: none;
            pointer-events: auto;
        `.trim();
    }

    /**
     * Create a protected media wrapper element
     */
    static createProtectedWrapper(
        contentElement: HTMLElement,
        protectionLevel: "light" | "medium" | "strict" = "medium"
    ): HTMLElement {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            overflow: hidden;
        `;

        if (protectionLevel === "strict") {
            wrapper.style.pointerEvents = "none";
        } else if (protectionLevel === "medium") {
            contentElement.style.pointerEvents = "none";
        }

        wrapper.appendChild(contentElement);
        return wrapper;
    }
}
