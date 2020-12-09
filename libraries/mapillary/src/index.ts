import { LibraryRegistry } from "@vertigis/web/config";
import Mapillary, { MapillaryModel } from "./components/Mapillary";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "mapillary",
        namespace: "your.custom.namespace",
        getComponentType: () => Mapillary,
        itemType: "mapillary",
        title: "Mapillary",
    });
    registry.registerModel({
        getModel: () => new MapillaryModel(),
        itemType: "mapillary",
    });
}
