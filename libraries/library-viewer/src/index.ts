import type { LibraryRegistry } from "@vertigis/web/config";

import LibraryViewer, { LibraryViewerModel } from "./components/LibraryViewer";
import PickList, { PickListModel } from "./components/PickList";
import ReadMe, { ReadMeModel } from "./components/ReadMe";

const LAYOUT_NAMESPACE = "libraryViewer";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "pick-list",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => PickList,
        itemType: "pick-list-model",
        title: "PickList",
    });
    registry.registerComponent({
        name: "readme",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => ReadMe,
        itemType: "readme-model",
        title: "ReadMe",
    });
    registry.registerComponent({
        name: "library-viewer",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => LibraryViewer,
        itemType: "library-viewer-model",
        title: "LibraryViewer",
    });
    registry.registerModel({
        getModel: (config) => new PickListModel(config),
        itemType: "pick-list-model",
    });
    registry.registerModel({
        getModel: (config) => new ReadMeModel(config),
        itemType: "readme-model",
    });
    registry.registerModel({
        getModel: (config) => new LibraryViewerModel(config),
        itemType: "library-viewer-model",
    });
    registry.registerCommand({
        name: "library-viewer.load-library",
        itemType: "library-viewer-model",
    });
    registry.registerCommand({
        name: "library-viewer.display-readme",
        itemType: "readme-model",
    });
    registry.registerCommand({
        name: "library-viewer.set-libraries",
        itemType: "pick-list-model",
    });
}
