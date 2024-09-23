import { setAssetPath as setCalciteComponentsAssetPath } from "@esri/calcite-components/dist/components";
import type { LibraryRegistry } from "@vertigis/web/config";

import ArcadeEditor from "./components/ArcadeEditor";
import ArcadeEditorModel from "./components/ArcadeEditor/ArcadeEditorModel";

// Individual imports for each component used in this sample
import "@arcgis/coding-components/dist/components/arcgis-arcade-editor";
import "@esri/calcite-components/dist/components/calcite-scrim";

// Set the asset path for calcite components
setCalciteComponentsAssetPath(
    "https://js.arcgis.com/calcite-components/2.8.6/assets"
);

export default function registerLibrary(registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "arcade-editor",
        namespace: "vertigis.web.incubator",
        getComponentType: () => ArcadeEditor,
        itemType: "arcade-editor-model",
        title: "language-web-incubator-arcade-editor-title",
    });
    registry.registerModel({
        getModel: (config) => new ArcadeEditorModel(config),
        itemType: "arcade-editor-model",
    });
}
