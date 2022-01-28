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

import DaylightModel from "./DaylightModel";

export interface DaylightSettings extends ComponentModelDesignerSettings {
    playButtons: boolean;
    shadowsToggle: boolean;
    datePicker: boolean;
    timezone: boolean;
}

export type SettingsMap = DesignerSettings<DaylightSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    DaylightModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    DaylightModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { playButtons, shadowsToggle, datePicker, timezone } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        playButtons,
        shadowsToggle,
        datePicker,
        timezone,
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    DaylightModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<DaylightSettings>[]) = (
        baseSchema.settings[0].settings as Setting<DaylightSettings>[]
    ).concat([
        {
            id: "playButtons",
            type: "checkbox",
            description: "language-designer-mapillary-key-description",
            displayName: "language-designer-mapillary-key-title",
        },
        {
            id: "shadowsToggle",
            type: "checkbox",
            description:
                "language-designer-mapillary-search-radius-description",
            displayName: "language-designer-mapillary-search-radius-title",
        },
        {
            id: "datePicker",
            type: "checkbox",
            description:
                "language-designer-mapillary-default-scale-description",
            displayName: "language-designer-mapillary-default-scale-title",
        },
        {
            id: "timezone",
            type: "checkbox",
            description: "language-designer-mapillary-start-synced-description",
            displayName: "language-designer-mapillary-start-synced-title",
        },
    ]);
    const schema: SettingsSchema<DaylightSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
