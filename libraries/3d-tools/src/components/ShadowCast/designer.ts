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

import ShadowCastModel from "./ShadowCastModel";

export interface ShadowCastSettings extends ComponentModelDesignerSettings {
    timeRangeSlider?: boolean;
    timezone?: boolean;
    datePicker?: boolean;
    visualizationOptions?: boolean;
    colorPicker?: boolean;
    tooltip?: boolean;
    visualizationType?: "threshold" | "duration" | "discrete";
}

export type SettingsMap = DesignerSettings<ShadowCastSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    ShadowCastModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    ShadowCastModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const {
        timeRangeSlider,
        timezone,
        datePicker,
        visualizationOptions,
        colorPicker,
        tooltip,
        visualizationType,
    } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        timeRangeSlider,
        timezone,
        datePicker,
        visualizationOptions,
        colorPicker,
        tooltip,
        visualizationType,
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    ShadowCastModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<ShadowCastSettings>[]) = (
        baseSchema.settings[0].settings as Setting<ShadowCastSettings>[]
    ).concat([
        {
            id: "timeRangeSlider",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-timeRangeSlider-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-timeRangeSlider-title",
        },
        {
            id: "timezone",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-timezone-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-timezone-title",
        },
        {
            id: "datePicker",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-datePicker-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-datePicker-title",
        },
        {
            id: "visualizationOptions",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-visualizationOptions-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-visualizationOptions-title",
        },
        {
            id: "colorPicker",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-colorPicker-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-colorPicker-title",
        },
        {
            id: "tooltip",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-tooltip-description",
            displayName: "language-designer-3d-tools-shadow-cast-tooltip-title",
        },
        {
            id: "visualizationType",
            type: "select",
            description:
                "language-designer-3d-tools-shadow-cast-visualizationType-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-visualizationType-title",
            values: [
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualizationType-threshold",
                    value: "threshold",
                },
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualizationType-duration",
                    value: "duration",
                },
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualizationType-discrete",
                    value: "discrete",
                },
            ],
        },
    ]);

    const schema: SettingsSchema<ShadowCastSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
