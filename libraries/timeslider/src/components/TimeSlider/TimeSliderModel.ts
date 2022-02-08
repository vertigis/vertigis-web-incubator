import {
    ComponentModelBase,
    ComponentModelProperties,
    importModel,
    PropertyDefs,
    serializable,
} from "@vertigis/web/models";
import { ItemType } from "@vertigis/arcgis-extensions/ItemType";
import { MapModel } from "@vertigis/web/mapping/MapModel";
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";
import TimeInterval from "@arcgis/core/TimeInterval";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TimeExtent from "@arcgis/core/TimeExtent";
import WebMap from "@arcgis/core/WebMap";

export type TimeSliderLayout = EsriTimeSlider["layout"];
export type TimeSliderMode = EsriTimeSlider["mode"];
export type TimeIntervalUnit = TimeInterval["unit"];

interface TimeSliderModelProperties extends ComponentModelProperties {
    /** The layout size for this time slider widget. */
    layout?: TimeSliderLayout;
    /** The toggle for whether the playback will automatically loop or not. */
    loop?: boolean;
    /** The number of milliseconds to wait between each stop. */
    playRate?: number;
    /** The various functional modes for this time slider. */
    mode?: TimeSliderMode;
    /** The toggle for overriding the default stops in this time slider. */
    overrideStops?: boolean;
    /** The time interval stops that this time slider will be divided into. */
    timeInterval?: number;
    /** The time unit configured for the configured time interval. */
    timeIntervalUnit?: TimeIntervalUnit;
    /** The toggle to show time information in this widget. */
    timeVisible?: boolean;
    /** This tracks whether this model has inherited config from the Esri map
     * object. This is serialized so that the state of this can persist between
     * app designer sessions. */
    inheritedWidgetConfig?: boolean;
}

@serializable
export default class TimeSliderModel extends ComponentModelBase<TimeSliderModelProperties> {
    @importModel(ItemType.MAP_EXTENSION)
    map: MapModel | undefined;
    widget: EsriTimeSlider;
    inheritedWidgetConfig: boolean;
    defaultStops:
        | __esri.StopsByCount
        | __esri.StopsByDates
        | __esri.StopsByInterval;

    _layout: TimeSliderLayout;
    _loop: boolean;
    _playRate: number;
    _mode: TimeSliderMode;
    _overrideStops: boolean;
    _timeInterval: number;
    _timeIntervalUnit: TimeIntervalUnit;
    _timeVisible: boolean;

    get layout(): TimeSliderLayout {
        return this.widget?.layout ?? this._layout;
    }
    set layout(value: TimeSliderLayout) {
        this._layout = value;
        if (this.widget) {
            this.widget.layout = value;
        }
    }

    get loop(): boolean {
        return this.widget?.loop ?? this._loop;
    }
    set loop(value: boolean) {
        this._loop = value;
        if (this.widget) {
            this.widget.loop = value;
        }
    }

    get playRate(): number {
        return this.widget?.playRate ?? this._playRate;
    }
    set playRate(value: number) {
        this._playRate = value;
        if (this.widget) {
            this.widget.playRate = value;
        }
    }

    get mode(): TimeSliderMode {
        return this.widget?.mode ?? this._mode;
    }
    set mode(value: TimeSliderMode) {
        this._mode = value;
        if (this.widget) {
            this.widget.mode = value;
            // Switching from between specific modes can result in timeExtent
            // being null, which breaks the UI.
            this.widget.timeExtent = this.widget.fullTimeExtent;
        }
    }

    get overrideStops(): boolean {
        return this._overrideStops;
    }
    set overrideStops(value: boolean) {
        this._overrideStops = value;
        if (this.widget) {
            if (value) {
                this.widget.stops = {
                    interval: new TimeInterval({
                        unit: this.timeIntervalUnit,
                        value: this.timeInterval,
                    }),
                };
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    this.widget.effectiveStops?.[
                        this.widget.effectiveStops.length - 1
                    ] < this.widget.fullTimeExtent.end
                ) {
                    this.widget.effectiveStops.push(
                        this.widget.fullTimeExtent.end
                    );
                }
            } else {
                this.widget.stops = this.defaultStops;
            }
        }
    }

    get timeInterval(): number {
        return this._timeInterval;
    }
    set timeInterval(value: number) {
        this._timeInterval = value;
        if (this.widget) {
            this.widget.stop();
            if (this.overrideStops) {
                this.widget.stops = {
                    interval: new TimeInterval({
                        unit: this.timeIntervalUnit,
                        value: value,
                    }),
                };
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    this.widget.effectiveStops?.[
                        this.widget.effectiveStops.length - 1
                    ] < this.widget.fullTimeExtent.end
                ) {
                    this.widget.effectiveStops.push(
                        this.widget.fullTimeExtent.end
                    );
                }
            }
        }
    }

    get timeIntervalUnit(): TimeIntervalUnit {
        return this._timeIntervalUnit;
    }
    set timeIntervalUnit(value: TimeIntervalUnit) {
        this._timeIntervalUnit = value;
        if (this.widget) {
            this.widget.stop();
            if (this.overrideStops) {
                this.widget.stops = {
                    interval: new TimeInterval({
                        unit: value,
                        value: this.timeInterval,
                    }),
                };
                // Ensure time slider playback will end on the latest date in the full
                // time extent.
                if (
                    this.widget.effectiveStops?.[
                        this.widget.effectiveStops.length - 1
                    ] < this.widget.fullTimeExtent.end
                ) {
                    this.widget.effectiveStops.push(
                        this.widget.fullTimeExtent.end
                    );
                }
            }
        }
    }

    get timeVisible(): boolean {
        return this.widget?.timeVisible ?? this._timeVisible;
    }
    set timeVisible(value: boolean) {
        this._timeVisible = value;
        if (this.widget) {
            this.widget.timeVisible = value;
        }
    }

    public updateTimeSliderWidget = (
        widget: EsriTimeSlider,
        webMap: WebMap
    ): void => {
        const promises: Promise<void>[] = [];
        // Check the web map for existing time slider config.
        if (webMap.widgets && webMap.widgets.timeSlider) {
            const timeSlider = webMap.widgets.timeSlider;
            this._updateWidgetFromWebMapTimeSlider(widget, timeSlider);
            // On first widget load, set default values
            if (!this.inheritedWidgetConfig) {
                if (timeSlider.loop) {
                    this.loop = widget.loop;
                }
                if (timeSlider.stopDelay) {
                    this.playRate = widget.playRate;
                }
            }
        } else {
            // Extract slider min and max range from the web map layers.
            promises.push(this._updateWidgetFromLayerTimeInfos(widget, webMap));
        }
        // This is only asynchronous when updating the widget from layer time
        // infos.
        void Promise.all(promises).then(() => {
            this.defaultStops = { ...widget.stops };
            // Only set the remaining widget properties if the fullTimeExtent
            // was set in the widget.
            if (
                widget.fullTimeExtent &&
                widget.fullTimeExtent.start &&
                widget.fullTimeExtent.end
            ) {
                if (!this.inheritedWidgetConfig) {
                    this.inheritedWidgetConfig = true;
                } else {
                    // Only override the stops only after the initial load of
                    // the time slider.
                    if (this.overrideStops) {
                        widget.stops = {
                            interval: new TimeInterval({
                                unit: this.timeIntervalUnit,
                                value: this.timeInterval,
                            }),
                        };
                        // Ensure time slider playback will end on the latest date in the full
                        // time extent.
                        if (
                            widget.effectiveStops?.[
                                widget.effectiveStops.length - 1
                            ] < widget.fullTimeExtent.end
                        ) {
                            widget.effectiveStops.push(
                                widget.fullTimeExtent.end
                            );
                        }
                        // Reset the default time extent to match the new
                        // stops.
                        widget.timeExtent = new TimeExtent({
                            start: widget.effectiveStops[0],
                            end: widget.effectiveStops[1],
                        });
                    }
                }
                // Apply Time Slider model properties to the widget.
                widget.layout = this.layout;
                widget.mode = this.mode;
                widget.loop = this.loop;
                widget.playRate = this.playRate;
                widget.timeVisible = this.timeVisible;
            }
            this.widget = widget;
        });
    };

    private _updateWidgetFromLayerTimeInfos = (
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
            widget.fullTimeExtent = new TimeExtent({ start, end });
            // Ensure time slider playback will end on the latest date in the full
            // time extent.
            if (
                widget.effectiveStops?.[widget.effectiveStops.length - 1] <
                widget.fullTimeExtent.end
            ) {
                widget.effectiveStops.push(widget.fullTimeExtent.end);
            }
        });
    };

    private _updateWidgetFromWebMapTimeSlider = (
        widget: EsriTimeSlider,
        timeSlider: __esri.WebMapTimeSlider
    ): void => {
        let timeExtentOption: string;
        if (timeSlider.fullTimeExtent) {
            widget.fullTimeExtent = timeSlider.fullTimeExtent;
            widget.timeExtent = timeSlider.currentTimeExtent;
        } else {
            widget.fullTimeExtent = timeSlider.currentTimeExtent;
            timeExtentOption = "currentTimeExtent";
        }
        // Set stops based on available properties in the time slider
        // config in this order: StopByDate, StopByCount, StopByInterval
        if (timeSlider.stops) {
            widget.stops = {
                dates: timeSlider.stops,
                timeExtent: widget.fullTimeExtent,
            };
        } else if (timeSlider.numStops) {
            widget.stops = {
                count: timeSlider.numStops,
                timeExtent: widget.fullTimeExtent,
            };
        } else if (timeSlider.stopInterval) {
            widget.stops = {
                interval: timeSlider.stopInterval,
                timeExtent: widget.fullTimeExtent,
            };
        }
        // Ensure time slider playback will end on the latest date in the full
        // time extent.
        if (
            widget.effectiveStops?.[widget.effectiveStops.length - 1] <
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

    protected _getSerializableProperties(): PropertyDefs<TimeSliderModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            layout: {
                serializeModes: ["initial"],
                default: "compact",
            },
            loop: {
                serializeModes: ["initial"],
                default: true,
            },
            playRate: {
                serializeModes: ["initial"],
                default: 1000,
            },
            mode: {
                serializeModes: ["initial"],
                default: "time-window",
            },
            overrideStops: {
                serializeModes: ["initial"],
                default: false,
            },
            timeInterval: {
                serializeModes: ["initial"],
                default: 1000,
            },
            timeIntervalUnit: {
                serializeModes: ["initial"],
                default: "milliseconds",
            },
            timeVisible: {
                serializeModes: ["initial"],
                default: false,
            },
            inheritedWidgetConfig: {
                serializeModes: ["initial"],
                default: false,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-time-slider-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "range-start",
            },
        };
    }
}
