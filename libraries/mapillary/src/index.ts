import { LibraryRegistry } from "@vertigis/web/config";
import { GetDesignerSettingsSchemaArgs } from "@vertigis/web/designer";
import Mapillary, { MapillaryModel } from "./components/Mapillary";
import {
    applySettings,
    getSettings,
    getSettingsSchema,
} from "./components/Mapillary/designer";
import invLanguage from "./locale/inv.json";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "mapillary",
        namespace: "vertigis.web.incubator",
        getComponentType: () => Mapillary,
        getDesignerSettings: (
            args: GetDesignerSettingsSchemaArgs<MapillaryModel, "">
        ) => getSettings(args),
        applyDesignerSettings: (args) => applySettings(args),
        getDesignerSettingsSchema: (
            args: GetDesignerSettingsSchemaArgs<MapillaryModel, "">
        ) => getSettingsSchema(args),
        itemType: "mapillary",
        title: "language-web-incubator-mapillary-title",
        iconId: "map-3rd-party",
    });
    registry.registerModel({
        getModel: (config) => new MapillaryModel(config),
        itemType: "mapillary",
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
