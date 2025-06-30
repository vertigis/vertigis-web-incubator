import type { LibraryRegistry } from "@vertigis/web/config";

import EagleView, { EagleViewModel } from "./components/EmbeddedExplorer";
import {
    applyEVSettings,
    getEVSettings,
    getPictSettingsSchema,
} from "./components/EmbeddedExplorer/designer";
import invLanguage from "./locale/inv.json";

const LAYOUT_NAMESPACE = "vertigis.web.incubator.eagleview";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        category: "map",
        name: "eagleview",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => EagleView,
        getDesignerSettings: getEVSettings,
        applyDesignerSettings: applyEVSettings,
        getDesignerSettingsSchema: getPictSettingsSchema,
        itemType: "eagleview",
        title: "language-designer-eagleview-title",
        iconId: "map-3rd-party",
    });
    registry.registerModel({
        getModel: (config) => new EagleViewModel(config),
        itemType: "eagleview",
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
