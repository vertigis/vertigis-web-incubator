import type { AppConfig } from "@vertigis/web/AppConfig";
import type { AppContext } from "@vertigis/web/AppContext";
import { command } from "@vertigis/web/messaging";
import {
    type ComponentModelProperties,
    ComponentModelBase,
    serializable,
    type PropertyDefs,
} from "@vertigis/web/models";
import { inject, FrameworkServiceType } from "@vertigis/web/services";
import { Builder, parseStringPromise as parseString } from "xml2js";

import type { SetLibraryArgs } from "../PickList/PickListModel";

export interface Library {
    /** The id of the library. This will be the name of the containing folder. */
    id: string;
    /** A human-readable title for the library. */
    title?: string;
}

export interface LibraryViewerModelProperties extends ComponentModelProperties {
    libraries?: Library[];
}

@serializable
export default class LibraryViewerModel extends ComponentModelBase<LibraryViewerModelProperties> {
    @inject(FrameworkServiceType.APP_CONTEXT)
    appContext: AppContext;

    /**
     * Configuration for the libraries in this collection that you'd like to be
     * available through this viewer. The `id` is the name of a sibling folder
     * with a library in it, and the `name` is whatever you'd like to show up as
     * the title in the picklist.
     */
    libraries: Library[];

    selectedLibrary: string;
    libraryUrl: string;

    protected override async _onInitialize(): Promise<void> {
        await super._onInitialize();

        this.selectedLibrary = parent.location.hash.substring(1);
        if (this.selectedLibrary === "") {
            this.selectedLibrary = this.libraries[0].id;
        }

        // The 'library-loaded' flag being set on the host element indicates that
        // this is the merged config and the rest of the UI should be set up
        // now. Otherwise we'll need to create the config and reload the app.
        const { hostElement } = this.appContext;
        if (hostElement.hasAttribute("library-loaded")) {
            // setTimeout is necessary here in order to make sure our custom
            // commands have initialized.
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            setTimeout(async () => {
                await this._displayUI(this.selectedLibrary);
                if (!parent.onhashchange) {
                    parent.onhashchange = () => this._handleHashChangeEvent();
                }
            }, 100);
        } else {
            parent.location.hash = this.selectedLibrary;
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            setTimeout(() => this._loadLibrary(this.selectedLibrary), 100);
        }
    }

    protected override async _onDestroy(): Promise<void> {
        await super._onDestroy();
        parent.onhashchange = undefined;
    }

    protected override _getSerializableProperties(): PropertyDefs<LibraryViewerModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            libraries: {
                serializeModes: ["initial"],
            },
        };
    }

    @command("library-viewer.load-library")
    protected async _executeLoadLibrary(libraryConfig: Library): Promise<void> {
        const { id: libraryId } = libraryConfig;
        const { hostElement } = this.appContext;
        const viewerId = "library-viewer";

        // Gather the materials needed for the library to load.
        const [
            sampleAppConfig,
            sampleLayout,
            customLibrary,
            viewerAppConfig,
            viewerLayout,
        ] = await Promise.all([
            import(
                /* webpackExclude: /node_modules/ */ `../../../../../libraries/${libraryId}/app/app.json`
            ),
            import(
                /* webpackExclude: /node_modules/ */ `../../../../../libraries/${libraryId}/app/layout.xml`
            ),
            import(
                /* webpackExclude: /(node_modules|library-viewer)/ */ `../../../../../libraries/${libraryId}/build/main.js`
            ),
            import(
                /* webpackExclude: /node_modules/ */ `../../../../../libraries/${viewerId}/app/app.json`
            ),
            import(
                /* webpackExclude: /node_modules/ */ `../../../../../libraries/${viewerId}/app/layout.xml`
            ),
        ]);

        // Parse the currently loaded layout and the library sample layout into
        // JSON objects.
        const [libraryXml, baseXml] = await Promise.all([
            parseString(sampleLayout?.default as string),
            parseString(viewerLayout?.default as string),
        ]);

        // Merge their top level attributes to get all the namespaces.
        baseXml.layout.$ = { ...baseXml.layout.$, ...libraryXml.layout.$ };

        // Add the sample layout items as children of the library-viewer component.
        const mergeRoot =
            baseXml.layout.split[0].stack[0]["library:library-viewer"][0];
        this._getChildElementNames(
            libraryXml.layout as Record<string, unknown>
        ).forEach(
            (element) => (mergeRoot[element] = libraryXml.layout[element])
        );

        // Output the merged layout as a string.
        const xmlBuilder = new Builder();
        const mergedLayout = xmlBuilder.buildObject(baseXml);

        // Merge the 'items' collections of the two AppConfig objects, taking
        // care not to modify the originals.
        const mergedAppConfig = { ...viewerAppConfig.default } as AppConfig;
        const mergedItems = [...viewerAppConfig.default.items];
        mergedAppConfig.items = mergedItems;
        const libraryAppConfig = sampleAppConfig?.default as AppConfig;
        libraryAppConfig.items.forEach((item) => {
            if (!mergedItems.some((appItem) => appItem.id === item.id)) {
                mergedItems.push(item);
            } else {
                const existingItem = mergedItems.find(
                    (appItem) => appItem.id === item.id
                );
                const mergedItem = { ...existingItem, ...item };
                mergedItems.splice(
                    mergedItems.indexOf(existingItem),
                    1,
                    mergedItem
                );
            }
        });

        // Cleanly shutdown the current application.
        await this.appContext.shutdown();

        // Bootstrap a new viewer application in the current iframe with the
        // merged layout and config.
        (window.require as any)(["require", "web"], (require, webViewer) => {
            require([
                "@vertigis/web-libraries!/common",
                "@vertigis/web-libraries!/web",
                "/main.js",
            ], (...libs) => {
                const options = {
                    appConfig: mergedAppConfig,
                    debugMode: true,
                    hostElement,
                    layout: mergedLayout,
                    libraries: [
                        ...libs.map((lib) => lib.default),
                        customLibrary.default,
                    ],
                };
                webViewer.bootstrap(options);
            });
        });
    }

    private async _displayUI(selectedLibrary: string): Promise<void> {
        this.libraryUrl =
            // This import makes the library download available at the constructed url.
            (
                await import(
                    /* webpackExclude: /(node_modules|library-viewer)/ */
                    `!!file-loader?{"name": "static/js/[name].[contenthash:8].[ext]"}!../../../../../libraries/${selectedLibrary}/build/main.js`
                )
            )?.default;
        await Promise.all([
            this.messages
                .command<SetLibraryArgs>("library-viewer.set-libraries")
                .execute({ libraries: this.libraries, selectedLibrary }),
            this.messages
                .command<string>("library-viewer.display-readme")
                .execute(selectedLibrary),
        ]);
    }

    private async _loadLibrary(selectedLibrary: string): Promise<void> {
        const { hostElement } = this.appContext;
        const library = this.libraries.find(
            (library) => library.id === selectedLibrary
        );
        if (library) {
            hostElement.setAttribute("library-loaded", selectedLibrary);
            await this.messages
                .command<Library>("library-viewer.load-library")
                .execute(library);
        }
    }

    private async _handleHashChangeEvent(): Promise<void> {
        await this._loadLibrary(parent.location.hash.substring(1));
    }

    private _getChildElementNames(element: Record<string, unknown>): string[] {
        return Object.keys(element).filter((key) => key !== "$");
    }
}
