import { LibraryRegistry } from "@vertigis/web/config";
import TimeSlider, { TimeSliderModel } from "./components/TimeSlider";
import {
    applySettings,
    getSettings,
    getSettingsSchema,
} from "./components/TimeSlider/designer";
import invLanguage from "./locale/inv.json";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "timeslider",
        namespace: "vertigis.web.incubator",
        getComponentType: () => TimeSlider,
        getDesignerSettings: (args) => getSettings(args),
        applyDesignerSettings: (args) => applySettings(args),
        getDesignerSettingsSchema: (args) => getSettingsSchema(args),
        itemType: "timeslider",
        title: "language-web-incubator-timeslider-title",
        iconId: "range-start",
    });
    registry.registerModel({
        getModel: (config) => new TimeSliderModel(config),
        itemType: "timeslider",
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
