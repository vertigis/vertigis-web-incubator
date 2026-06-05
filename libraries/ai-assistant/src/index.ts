import type { LibraryRegistry } from "@vertigis/web/config";
import type { GetDesignerSettingsSchemaArgs } from "@vertigis/web/designer";

import ArcGISAssistant, {
    applySettings,
    ArcGISAssistantModel,
    getSettings,
    getSettingsSchema,
} from "./components/ArcGISAssistant";
import invLanguage from "./locale/inv.json";

const LAYOUT_NAMESPACE = "custom.a1ccba60";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        category: "map",
        iconId: "station-locator",
        name: "arcgis-assistant",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => ArcGISAssistant,
        getDesignerSettings: async (args: GetDesignerSettingsSchemaArgs<ArcGISAssistantModel>) => getSettings(args),
        applyDesignerSettings: async args => applySettings(args),
        getDesignerSettingsSchema: async (args: GetDesignerSettingsSchemaArgs<ArcGISAssistantModel>) =>
            getSettingsSchema(args),
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
    registry.registerLanguageResources({
        locale: "inv",
        values: invLanguage as { [key: string]: string },
    });
    registry.registerLanguageResources({
        locale: "en",
        values: invLanguage as { [key: string]: string },
    });
}
