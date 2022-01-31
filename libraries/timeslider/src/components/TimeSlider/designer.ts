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

import TimeSliderModel from "./TimeSliderModel";

export type TimeSliderLayout = "auto" | "compact" | "wide";
export type TimeSliderMode =
    | "instant"
    | "time-window"
    | "cumulative-from-start"
    | "cumulative-from-end";
export type TimeIntervalUnit =
    | "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years"
    | "decades"
    | "centuries";

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
                    displayName: "Compact",
                    value: "compact",
                },
                {
                    displayName: "Wide",
                    value: "wide",
                },
            ],
            description: "language-designer-timeslider-layout-description",
            displayName: "language-designer-timeslider-layout-title",
        },
        {
            id: "loop",
            type: "checkbox",
            description: "language-designer-timeslider-loop-description",
            displayName: "language-designer-timeslider-loop-title",
        },
        {
            id: "playRate",
            type: "number",
            description: "language-designer-timeslider-play-rate-description",
            displayName: "language-designer-timeslider-play-rate-title",
        },
        {
            id: "mode",
            type: "select",
            values: [
                {
                    displayName: "Instant",
                    value: "instant",
                },
                {
                    displayName: "Time Window",
                    value: "time-window",
                },
                {
                    displayName: "Cumulative From Start",
                    value: "cumulative-from-start",
                },
                {
                    displayName: "Cumulative From End",
                    value: "cumulative-from-end",
                },
            ],
            description: "language-designer-timeslider-mode-description",
            displayName: "language-designer-timeslider-mode-title",
        },
        {
            id: "overrideStops",
            type: "checkbox",
            description:
                "language-designer-timeslider-override-stops-description",
            displayName: "language-designer-timeslider-override-stops-title",
        },
        {
            id: "timeInterval",
            type: "number",
            description:
                "language-designer-timeslider-time-interval-description",
            displayName: "language-designer-timeslider-time-interval-title",
            isVisible: (data) => data.overrideStops,
        },
        {
            id: "timeIntervalUnit",
            type: "select",
            values: [
                {
                    displayName: "Milliseconds",
                    value: "milliseconds",
                },
                {
                    displayName: "Seconds",
                    value: "seconds",
                },
                {
                    displayName: "Minutes",
                    value: "minutes",
                },
                {
                    displayName: "Hours",
                    value: "hours",
                },
                {
                    displayName: "Days",
                    value: "days",
                },
                {
                    displayName: "Weeks",
                    value: "weeks",
                },
                {
                    displayName: "Months",
                    value: "months",
                },
                {
                    displayName: "Years",
                    value: "years",
                },
                {
                    displayName: "Decades",
                    value: "decades",
                },
                {
                    displayName: "Centuries",
                    value: "centuries",
                },
            ],
            description:
                "language-designer-timeslider-time-interval-unit-description",
            displayName:
                "language-designer-timeslider-time-interval-unit-title",
            isVisible: (data) => data.overrideStops,
        },
        {
            id: "timeVisible",
            type: "checkbox",
            description:
                "language-designer-timeslider-time-visible-description",
            displayName: "language-designer-timeslider-time-visible-title",
        },
    ]);
    const schema: SettingsSchema<TimeSliderSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
