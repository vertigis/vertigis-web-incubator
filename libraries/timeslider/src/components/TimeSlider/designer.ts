import type {
    ApplyDesignerSettingsCallback,
    ComponentModelDesignerSettings,
    DesignerSettings,
    GetDesignerSettingsCallback,
    GetDesignerSettingsSchemaCallback,
    SettingsSchema,
} from "@vertigis/web/designer";
import {
    applyComponentModelDesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
} from "@vertigis/web/designer";

import type TimeSliderModel from "./TimeSliderModel";

export type TimeSliderSettings = ComponentModelDesignerSettings;

export type SettingsMap = DesignerSettings<TimeSliderSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    TimeSliderModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    TimeSliderModel,
    SettingsMap
> = async (args) => ({
    ...(await getComponentModelDesignerSettings(args)),
});

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    TimeSliderModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    const schema: SettingsSchema<TimeSliderSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
