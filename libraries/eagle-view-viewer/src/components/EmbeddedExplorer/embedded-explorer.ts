/**
 * Partial interface for the EagleView Embedded Explorer widget.
 */

export interface EagleViewView {
    lonLat: { lat: number; lon: number };
    rotation: number;
    zoom: number;
}

interface EmbeddedExplorerOptions {
    containerId?: string;
    apiKey?: string;
    theme?: "light" | "dark";
    view?: EagleViewView;
}

export interface EmbeddedExplorerInstance {
    initialize(options: EmbeddedExplorerOptions): void;
    loadContent(contentId: string): Promise<void>;
    setTheme(theme: "light" | "dark"): void;
    on(
        event:
            | "onViewUpdate"
            | "featureClick"
            | "layerSearch"
            | "Errors"
            | "onMapReady"
            | "onLayersDataLoad",
        callback: (...args: any[]) => void
    ): void;
    off(
        event:
            | "onViewUpdate"
            | "featureClick"
            | "layerSearch"
            | "Errors"
            | "onMapReady"
            | "onLayersDataLoad"
    ): void;
    destroy(containerId: string): void;
    mount(
        containerId: string,
        options?: EmbeddedExplorerOptions
    ): EmbeddedExplorerInstance;
    setView(view: EagleViewView, done?: () => void): void;
}

export interface WindowWithEv extends Window {
    ev?: {
        EmbeddedExplorer: {
            // eslint-disable-next-line @typescript-eslint/prefer-function-type
            new (): EmbeddedExplorerInstance;
        };
    };

    define?: any;
    require?: any;
}

/**
 * Creates a script element for the EagleView Embedded Explorer widget.
 * This script is loaded from the EagleView CDN.
 *
 * @returns {HTMLScriptElement} The script element to be appended to the document.
 */
export const createEagleViewScript = (): HTMLScriptElement => {
    const script = document.createElement("script");
    script.id = "embedded-explorer-widget";
    script.src =
        "https://embedded-explorer.eagleview.com/static/embedded-explorer-widget.js";
    script.type = "application/javascript";
    script.crossOrigin = "anonymous|use-credentials";
    script.async = false;
    return script;
};
