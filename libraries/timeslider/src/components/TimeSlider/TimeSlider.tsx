import { ReactElement, useCallback } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";
import TimeSliderModel from "./TimeSliderModel";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import "./TimeSlider.css";
import React, { ComponentType } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TimeExtent from "@arcgis/core/TimeExtent";
import TimeInterval from "@arcgis/core/TimeInterval";
import { useWatch, useWatchAndRerender } from "@vertigis/web/ui";
import WebMap from "@arcgis/core/WebMap";

export type TimeSliderProps = MapWidgetProps<TimeSliderModel, EsriTimeSlider>;
const TimeSliderWrapper: ComponentType<TimeSliderProps> = createEsriMapWidget<
    TimeSliderModel,
    EsriTimeSlider
>(EsriTimeSlider, undefined, true);

const TimeSlider = (
    props: LayoutElementProperties<TimeSliderModel>
): ReactElement => {
    // A unique DOM ID to be used for a11y purposes.
    const model: TimeSliderModel = props.model;

    const updateTimeSliderWidget = useCallback(
        (widget: EsriTimeSlider, webMap: WebMap): void => {
            const promises: Promise<void>[] = [];
            // Check the web map for existing time slider config.
            if (webMap.widgets && webMap.widgets.timeSlider) {
                const timeSlider = webMap.widgets.timeSlider;
                updateWidgetFromWebMapTimeSlider(widget, timeSlider);
                // On first widget load, set default values
                if (!model.inheritedWidgetConfig) {
                    if (timeSlider.loop) {
                        model.loop = widget.loop;
                    }
                    if (timeSlider.stopDelay) {
                        model.playRate = widget.playRate;
                    }
                }
            } else {
                // Extract slider min and max range from the web map layers.
                promises.push(updateWidgetFromLayerTimeInfos(widget, webMap));
            }
            // This is only asynchronous when updating the widget from layer time
            // infos.
            void Promise.all(promises).then(() => {
                model.defaultStops = { ...widget.stops };
                // Only set the remaining widget properties if the fullTimeExtent
                // was set in the widget.
                if (
                    widget.fullTimeExtent &&
                    widget.fullTimeExtent.start &&
                    widget.fullTimeExtent.end
                ) {
                    if (!model.inheritedWidgetConfig) {
                        model.inheritedWidgetConfig = true;
                    } else {
                        // Only override the stops only after the initial load of
                        // the time slider.
                        if (model.overrideStops) {
                            widget.set("stops", {
                                interval: new TimeInterval({
                                    unit: model.timeIntervalUnit,
                                    value: model.timeInterval,
                                }),
                            });
                            // Ensure time slider playback will end on the latest date in the full
                            // time extent.
                            if (
                                widget.effectiveStops &&
                                widget.effectiveStops[
                                    widget.effectiveStops.length - 1
                                ] < widget.fullTimeExtent.end
                            ) {
                                widget.effectiveStops.push(
                                    widget.fullTimeExtent.end
                                );
                            }
                            // Reset the default time extent to match the new
                            // stops.
                            widget.set(
                                "timeExtent",
                                new TimeExtent({
                                    start: widget.effectiveStops[0],
                                    end: widget.effectiveStops[1],
                                })
                            );
                        }
                    }
                    // Apply Time Slider model properties to the widget.
                    widget.set("layout", model.layout);
                    widget.set("mode", model.mode);
                    widget.set("loop", model.loop);
                    widget.set("playRate", model.playRate);
                    widget.set("timeVisible", model.timeVisible);
                }
                model.widget = widget;
            });
        },
        [model]
    );

    const updateWidgetFromLayerTimeInfos = (
        widget: EsriTimeSlider,
        map: __esri.Map
    ): Promise<void> => {
        let start, end;
        const promises: Promise<void>[] = [];
        map.layers.forEach((tempLayer) => {
            const layer = tempLayer as FeatureLayer;

            promises.push(
                layer.load().then(() => {
                    if (layer.timeInfo) {
                        if (
                            start === undefined ||
                            start > layer.timeInfo.fullTimeExtent.start
                        ) {
                            start = layer.timeInfo.fullTimeExtent.start;
                        }
                        if (
                            end === undefined ||
                            end < layer.timeInfo.fullTimeExtent.end
                        ) {
                            end = layer.timeInfo.fullTimeExtent.end;
                        }
                    }
                })
            );
        });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        return Promise.all(promises).then(() => {
            widget.set("fullTimeExtent", new TimeExtent({ start, end }));
            // Ensure time slider playback will end on the latest date in the full
            // time extent.
            if (
                widget.effectiveStops &&
                widget.effectiveStops[widget.effectiveStops.length - 1] <
                    widget.fullTimeExtent.end
            ) {
                widget.effectiveStops.push(widget.fullTimeExtent.end);
            }
        });
    };

    const updateWidgetFromWebMapTimeSlider = (
        widget: EsriTimeSlider,
        timeSlider: __esri.WebMapTimeSlider
    ): void => {
        let timeExtentOption: string;
        if (timeSlider.fullTimeExtent) {
            widget.set("fullTimeExtent", timeSlider.fullTimeExtent);
            widget.set("timeExtent", timeSlider.currentTimeExtent);
        } else {
            widget.set("fullTimeExtent", timeSlider.currentTimeExtent);
            timeExtentOption = "currentTimeExtent";
        }
        // Set stops based on available properties in the time slider
        // config in this order: StopByDate, StopByCount, StopByInterval
        if (timeSlider.stops) {
            widget.set("stops", {
                dates: timeSlider.stops,
                timeExtent: widget.fullTimeExtent,
            });
        } else if (timeSlider.numStops) {
            widget.set("stops", {
                count: timeSlider.numStops,
                timeExtent: widget.fullTimeExtent,
            });
        } else if (timeSlider.stopInterval) {
            widget.set("stops", {
                interval: timeSlider.stopInterval,
                timeExtent: widget.fullTimeExtent,
            });
        }
        // Ensure time slider playback will end on the latest date in the full
        // time extent.
        if (
            widget.effectiveStops &&
            widget.effectiveStops[widget.effectiveStops.length - 1] <
                widget.fullTimeExtent.end
        ) {
            widget.effectiveStops.push(widget.fullTimeExtent.end);
        }
        if (timeExtentOption === "currentTimeExtent") {
            // Set a default timeExtent if fullTimeExtent was null.
            widget.set(
                "timeExtent",
                new TimeExtent({
                    start: widget.effectiveStops[0],
                    end: widget.effectiveStops[1],
                })
            );
        }
    };

    // Any time the Time Slider model properties change, we need to re-render
    // the component so our UI is consistent, as well as set the Esri widget
    // configuration.
    useWatchAndRerender(model, "layout");
    useWatch(model, "layout", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            model.widget.set("layout", newValue);
        }
    });
    useWatchAndRerender(model, "loop");
    useWatch(model, "loop", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            model.widget.set("loop", newValue);
        }
    });
    useWatchAndRerender(model, "playRate");
    useWatch(model, "playRate", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            model.widget.set("playRate", newValue);
        }
    });
    useWatchAndRerender(model, "mode");
    useWatch(model, "mode", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            model.widget.set("mode", newValue);
            // Switching from between specific modes can result in timeExtent
            // being null, which breaks the UI.
            model.widget.timeExtent = model.widget.fullTimeExtent;
        }
    });
    useWatchAndRerender(model, "overrideStops");
    useWatch(model, "overrideStops", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            if (newValue) {
                model.widget.set("stops", {
                    interval: new TimeInterval({
                        unit: model.timeIntervalUnit,
                        value: model.timeInterval,
                    }),
                });
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    model.widget.effectiveStops &&
                    model.widget.effectiveStops[
                        model.widget.effectiveStops.length - 1
                    ] < model.widget.fullTimeExtent.end
                ) {
                    model.widget.effectiveStops.push(
                        model.widget.fullTimeExtent.end
                    );
                }
            } else {
                model.widget.set("stops", model.defaultStops);
            }
        }
    });
    useWatchAndRerender(model, "timeInterval");
    useWatch(model, "timeInterval", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            if (model.overrideStops) {
                model.widget.set("stops", {
                    interval: new TimeInterval({
                        unit: model.timeIntervalUnit,
                        value: newValue,
                    }),
                });
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    model.widget.effectiveStops &&
                    model.widget.effectiveStops[
                        model.widget.effectiveStops.length - 1
                    ] < model.widget.fullTimeExtent.end
                ) {
                    model.widget.effectiveStops.push(
                        model.widget.fullTimeExtent.end
                    );
                }
            }
        }
    });
    useWatchAndRerender(model, "timeIntervalUnit");
    useWatch(model, "timeIntervalUnit", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            if (model.overrideStops) {
                model.widget.set("stops", {
                    interval: new TimeInterval({
                        unit: newValue,
                        value: model.timeInterval,
                    }),
                });
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    model.widget.effectiveStops &&
                    model.widget.effectiveStops[
                        model.widget.effectiveStops.length - 1
                    ] < model.widget.fullTimeExtent.end
                ) {
                    model.widget.effectiveStops.push(
                        model.widget.fullTimeExtent.end
                    );
                }
            }
        }
    });
    useWatchAndRerender(model, "timeVisible");
    useWatch(model, "timeVisible", (newValue) => {
        if (model.widget) {
            model.widget.stop();
            model.widget.set("timeVisible", newValue);
        }
    });

    // Watch for map updates, as the overall time extent may have changed.
    useWatchAndRerender(model, "map.map");
    useWatch(
        model,
        "map.map",
        (newMap) => {
            // Only update the model if the web map has changed.
            if (model.widget) {
                model.widget.stop();
                // Check the web map for existing time slider config
                updateTimeSliderWidget(model.widget, newMap);
            }
        },
        [model.map.view]
    );

    const onWidgetCreated = useCallback(
        (widget: EsriTimeSlider) => {
            const map = model.map;

            // Synchronize values from model.
            if (!map && !map.map) {
                return;
            }

            const webMap = map.map as WebMap;
            updateTimeSliderWidget(widget, webMap);
        },
        [model, updateTimeSliderWidget]
    );
    const onWidgetDestroyed = useCallback(() => {
        // Remove the time extent filter on the map view.
        model.map.view.timeExtent = null;
        model.widget = null;
    }, [model]);

    return (
        <TimeSliderWrapper
            model={props.model}
            preloadChildren={() => Promise.resolve()}
            onWidgetCreated={onWidgetCreated}
            onWidgetDestroyed={onWidgetDestroyed}
        />
    );
};

export default TimeSlider;
