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
import type { Color as ColorJson } from "@vertigis/arcgis-extensions/portal/Symbol";
import { toColor } from "@vertigis/web/branding";

import ElevationProfileModel, {
    ElevationProfileModelProperties,
} from "./ElevationProfileModel";

export interface ElevationProfileSettings
    extends ComponentModelDesignerSettings {
    legend?: boolean;
    chart?: boolean;
    clearButton?: boolean;
    settingsButton?: boolean;
    sketchButton?: boolean;
    selectButton?: boolean;
    uniformChartScalingToggle?: boolean;
    profileLineGround?: boolean;
    profileLineGroundColor?: ColorJson;
    profileLineInput?: boolean;
    profileLineInputColor?: ColorJson;
    profileLineView?: boolean;
    profileLineViewColor?: ColorJson;
}

export type SettingsMap = DesignerSettings<ElevationProfileSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    ElevationProfileModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    const {
        profileLineGroundColor,
        profileLineInputColor,
        profileLineViewColor,
        ...otherSettings
    } = settings;
    await applyComponentModelDesignerSettings(args);

    const applySettings: Partial<ElevationProfileModelProperties> =
        otherSettings;
    if (profileLineGroundColor) {
        applySettings.profileLineGroundColor = toColor(
            profileLineGroundColor
        )?.toCss();
    }
    if (profileLineInputColor) {
        applySettings.profileLineInputColor = toColor(
            profileLineInputColor
        )?.toCss();
    }
    if (profileLineViewColor) {
        applySettings.profileLineViewColor =
            toColor(profileLineViewColor)?.toCss();
    }

    model.assignProperties(applySettings);
};

export const getSettings: GetDesignerSettingsCallback<
    ElevationProfileModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const {
        legend,
        chart,
        clearButton,
        settingsButton,
        sketchButton,
        selectButton,
        uniformChartScalingToggle,
        profileLineGround,
        profileLineInput,
        profileLineView,
        profileLineGroundColor,
        profileLineInputColor,
        profileLineViewColor,
    } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        legend,
        chart,
        clearButton,
        settingsButton,
        sketchButton,
        selectButton,
        uniformChartScalingToggle,
        profileLineGround,
        profileLineInput,
        profileLineView,
        profileLineGroundColor: toColor(profileLineGroundColor).toJSON(),
        profileLineInputColor: toColor(profileLineInputColor).toJSON(),
        profileLineViewColor: toColor(profileLineViewColor).toJSON(),
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    ElevationProfileModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<ElevationProfileSettings>[]) = (
        baseSchema.settings[0].settings as Setting<ElevationProfileSettings>[]
    ).concat([
        {
            id: "legend",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-legend-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-legend-title",
        },
        {
            id: "chart",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-chart-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-chart-title",
        },
        {
            id: "clearButton",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-clear-button-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-clear-button-title",
        },
        {
            id: "settingsButton",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-settings-button-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-settings-button-title",
        },
        {
            id: "sketchButton",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-sketch-button-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-sketch-button-title",
        },
        {
            id: "selectButton",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-select-button-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-select-button-title",
        },
        {
            id: "uniformChartScalingToggle",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-title",
        },
        {
            id: "profileLineGround",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-ground-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-ground-title",
        },
        {
            id: "profileLineGroundColor",
            type: "color",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-ground-color-title",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-ground-color-description",
            isVisible: (settings) => settings.profileLineGround,
        },
        {
            id: "profileLineInput",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-input-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-input-title",
        },
        {
            id: "profileLineInputColor",
            type: "color",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-input-color-title",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-input-color-description",
            isVisible: (settings) => settings.profileLineInput,
        },
        {
            id: "profileLineView",
            type: "checkbox",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-view-description",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-view-title",
        },
        {
            id: "profileLineViewColor",
            type: "color",
            displayName:
                "language-designer-3d-tools-elevation-profile-profile-line-view-color-title",
            description:
                "language-designer-3d-tools-elevation-profile-profile-line-view-color-description",
            isVisible: (settings) => settings.profileLineView,
        },
    ]);

    const schema: SettingsSchema<ElevationProfileSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
