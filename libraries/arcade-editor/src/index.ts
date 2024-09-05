import type { LibraryRegistry } from "@vertigis/web/config";

import ArcadeEditor from "./components/ArcadeEditor";
import ArcadeEditorModel from "./components/ArcadeEditor/ArcadeEditorModel";

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
