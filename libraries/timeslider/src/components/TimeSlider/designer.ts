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

import TimeSliderModel, {
    TimeIntervalUnit,
    TimeSliderLayout,
    TimeSliderMode,
} from "./TimeSliderModel";

export interface TimeSliderSettings extends ComponentModelDesignerSettings {
    layout: TimeSliderLayout;
    loop: boolean;
    playRate: number;
    mode: TimeSliderMode;
    overrideStops: boolean;
    timeInterval: number;
    timeIntervalUnit: TimeIntervalUnit;
    timeVisible: boolean;
}

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
> = async (args) => {
    const { model } = args;
    const {
        layout,
        loop,
        playRate,
        mode,
        overrideStops,
        timeInterval,
        timeIntervalUnit,
        timeVisible,
    } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        layout,
        loop,
        playRate,
        mode,
        overrideStops,
        timeInterval,
        timeIntervalUnit,
        timeVisible,
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    TimeSliderModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<TimeSliderSettings>[]) = (
        baseSchema.settings[0].settings as Setting<TimeSliderSettings>[]
    ).concat([
        {
            id: "layout",
            type: "select",
            values: [
                {
                    displayName: "language-designer-time-slider-layout-compact",
                    value: "compact",
                },
                {
                    displayName: "language-designer-time-slider-layout-wide",
                    value: "wide",
                },
            ],
            description: "language-designer-time-slider-layout-description",
            displayName: "language-designer-time-slider-layout-title",
        },
        {
            id: "loop",
            type: "checkbox",
            description: "language-designer-time-slider-loop-description",
            displayName: "language-designer-time-slider-loop-title",
        },
        {
            id: "playRate",
            type: "number",
            description: "language-designer-time-slider-play-rate-description",
            displayName: "language-designer-time-slider-play-rate-title",
        },
        {
            id: "mode",
            type: "select",
            values: [
                {
                    displayName: "language-designer-time-slider-mode-instant",
                    value: "instant",
                },
                {
                    displayName:
                        "language-designer-time-slider-mode-time-window",
                    value: "time-window",
                },
                {
                    displayName:
                        "language-designer-time-slider-mode-cumulative-from-start",
                    value: "cumulative-from-start",
                },
                {
                    displayName:
                        "language-designer-time-slider-mode-cumulative-from-end",
                    value: "cumulative-from-end",
                },
            ],
            description: "language-designer-time-slider-mode-description",
            displayName: "language-designer-time-slider-mode-title",
        },
        {
            id: "overrideStops",
            type: "checkbox",
            description:
                "language-designer-time-slider-override-stops-description",
            displayName: "language-designer-time-slider-override-stops-title",
        },
        {
            id: "timeInterval",
            type: "number",
            description:
                "language-designer-time-slider-time-interval-description",
            displayName: "language-designer-time-slider-time-interval-title",
            isVisible: (data) => data.overrideStops,
        },
        {
            id: "timeIntervalUnit",
            type: "select",
            values: [
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-milliseconds",
                    value: "milliseconds",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-seconds",
                    value: "seconds",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-minutes",
                    value: "minutes",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-hours",
                    value: "hours",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-days",
                    value: "days",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-weeks",
                    value: "weeks",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-months",
                    value: "months",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-years",
                    value: "years",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-decades",
                    value: "decades",
                },
                {
                    displayName:
                        "language-designer-time-slider-time-interval-unit-centuries",
                    value: "centuries",
                },
            ],
            description:
                "language-designer-time-slider-time-interval-unit-description",
            displayName:
                "language-designer-time-slider-time-interval-unit-title",
            isVisible: (data) => data.overrideStops,
        },
        {
            id: "timeVisible",
            type: "checkbox",
            description:
                "language-designer-time-slider-time-visible-description",
            displayName: "language-designer-time-slider-time-visible-title",
        },
    ]);
    const schema: SettingsSchema<TimeSliderSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
