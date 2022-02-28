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
                "language-designer-3d-tools-shadow-cast-time-range-slider-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-time-range-slider-title",
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
                "language-designer-3d-tools-shadow-cast-date-picker-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-date-picker-title",
        },
        {
            id: "visualizationOptions",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-visualization-options-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-visualization-options-title",
        },
        {
            id: "colorPicker",
            type: "checkbox",
            description:
                "language-designer-3d-tools-shadow-cast-color-picker-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-color-picker-title",
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
                "language-designer-3d-tools-shadow-cast-visualization-type-description",
            displayName:
                "language-designer-3d-tools-shadow-cast-visualization-type-title",
            values: [
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualization-type-threshold",
                    value: "threshold",
                },
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualization-type-duration",
                    value: "duration",
                },
                {
                    displayName:
                        "language-designer-3d-tools-shadow-cast-visualization-type-discrete",
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
