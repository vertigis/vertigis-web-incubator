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

type DateOrSeason = "date" | "season";

export interface DaylightSettings extends ComponentModelDesignerSettings {
    playButtons: boolean;
    shadowsToggle: boolean;
    datePicker: boolean;
    timezone: boolean;
    dateOrSeason: DateOrSeason;
    playSpeedMultiplier: number;
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
    const {
        playButtons,
        shadowsToggle,
        datePicker,
        timezone,
        dateOrSeason,
        playSpeedMultiplier,
    } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        playButtons,
        shadowsToggle,
        datePicker,
        timezone,
        dateOrSeason,
        playSpeedMultiplier,
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
            description:
                "language-designer-3d-tools-daylight-play-buttons-description",
            displayName:
                "language-designer-3d-tools-daylight-play-buttons-title",
        },
        {
            id: "shadowsToggle",
            type: "checkbox",
            description:
                "language-designer-3d-tools-daylight-shadows-toggle-description",
            displayName:
                "language-designer-3d-tools-daylight-shadows-toggle-title",
        },
        {
            id: "datePicker",
            type: "checkbox",
            description:
                "language-designer-3d-tools-daylight-date-picker-description",
            displayName:
                "language-designer-3d-tools-daylight-date-picker-title",
        },
        {
            id: "timezone",
            type: "checkbox",
            description:
                "language-designer-3d-tools-daylight-timezone-description",
            displayName: "language-designer-3d-tools-daylight-timezone-title",
        },
        {
            id: "playSpeedMultiplier",
            type: "number",
            description:
                "language-designer-3d-tools-daylight-play-speed-multiplier-description",
            displayName:
                "language-designer-3d-tools-daylight-play-speed-multiplier-title",
            isRequired: true,
            min: 0,
        },
        {
            id: "dateOrSeason",
            type: "select",
            description:
                "language-designer-3d-tools-daylight-date-or-season-description",
            displayName:
                "language-designer-3d-tools-daylight-date-or-season-title",
            values: [
                {
                    displayName:
                        "language-designer-3d-tools-daylight-date-or-season-date",
                    value: "date",
                },
                {
                    displayName:
                        "language-designer-3d-tools-daylight-date-or-season-season",
                    value: "season",
                },
            ],
        },
    ]);
    const schema: SettingsSchema<DaylightSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
