import {
    applyComponentModelDesignerSettings,
    ApplyDesignerSettingsCallback,
    ComponentModelDesignerSettings,
    DesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
    GetDesignerSettingsCallback,
    GetDesignerSettingsSchemaCallback,
    Setting,
    SettingsSchema,
} from "@vertigis/web/designer";

import SliceModel from "./SliceModel";

export interface SliceSettings extends ComponentModelDesignerSettings {
    tiltEnabled?: boolean;
}

export type SettingsMap = DesignerSettings<SliceSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    SliceModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    SliceModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { tiltEnabled } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        tiltEnabled,
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    SliceModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<SliceSettings>[]) = (
        baseSchema.settings[0].settings as Setting<SliceSettings>[]
    ).concat([
        {
            id: "tiltEnabled",
            type: "checkbox",
            description:
                "language-designer-3d-tools-slice-tilt-enabled-description",
            displayName: "language-designer-3d-tools-slice-tilt-enabled-title",
        },
    ]);
    const schema: SettingsSchema<SliceSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
