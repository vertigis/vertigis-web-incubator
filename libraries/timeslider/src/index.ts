import type { LibraryRegistry } from "@vertigis/web/config";
import type { GetDesignerSettingsSchemaArgs } from "@vertigis/web/designer";

import TimeSlider, { TimeSliderModel } from "./components/TimeSlider";
import {
    applySettings,
    getSettings,
    getSettingsSchema,
} from "./components/TimeSlider/designer";
import invLanguage from "./locale/inv.json";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "time-slider",
        namespace: "vertigis.web.incubator.time-slider",
        getComponentType: () => TimeSlider,
        getDesignerSettings: (
            args: GetDesignerSettingsSchemaArgs<TimeSliderModel, "">
        ) => getSettings(args),
        applyDesignerSettings: (args) => applySettings(args),
        getDesignerSettingsSchema: (
            args: GetDesignerSettingsSchemaArgs<TimeSliderModel, "">
        ) => getSettingsSchema(args),
        itemType: "time-slider",
        title: "language-web-incubator-time-slider-title",
        iconId: "range-start",
    });
    registry.registerModel({
        getModel: (config) => new TimeSliderModel(config),
        itemType: "time-slider",
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
