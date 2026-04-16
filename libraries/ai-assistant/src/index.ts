import type { LibraryRegistry } from "@vertigis/web/config";

import ArcGISAssistant, { ArcGISAssistantModel } from "./components/ArcGISAssistant";

const LAYOUT_NAMESPACE = "custom.a1ccba60";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        category: "map",
        iconId: "station-locator",
        name: "arcgis-assistant",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => ArcGISAssistant,
        itemType: "arcgis-assistant",
        title: "ArcGIS Assistant",
    });
    registry.registerModel({
        getModel: config => new ArcGISAssistantModel(config),
        itemType: "arcgis-assistant",
    });
    registry.registerCommand({
        name: "arcgis-assistant.clear-chat-history",
        itemType: "arcgis-assistant",
    });
    registry.registerCommand({
        name: "arcgis-assistant.submit-message",
        itemType: "arcgis-assistant",
    });
}
