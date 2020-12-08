import { LibraryRegistry } from "@vertigis/web/config";
import EmbeddedMap, { EmbeddedMapModel } from "./components/EmbeddedMap";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "embedded-map",
        namespace: "your.custom.namespace",
        getComponentType: () => EmbeddedMap,
        itemType: "embedded-map",
        title: "Embedded Map",
    });
    registry.registerModel({
        getModel: () => new EmbeddedMapModel(),
        itemType: "embedded-map",
    });
}
