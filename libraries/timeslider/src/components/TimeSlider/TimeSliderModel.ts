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
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TimeExtent from "@arcgis/core/TimeExtent";
import WebMap from "@arcgis/core/WebMap";

export type TimeSliderLayout = EsriTimeSlider["layout"];
export type TimeSliderMode = EsriTimeSlider["mode"];

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
    /** The toggle to show time information in this widget. */
    timeVisible?: boolean;
}

@serializable
export default class TimeSliderModel extends ComponentModelBase<TimeSliderModelProperties> {
    @importModel(ItemType.MAP_EXTENSION)
    map: MapModel | undefined;
    widget: EsriTimeSlider;
    _layout: TimeSliderLayout;
    _loop: boolean;
    _playRate: number;
    _mode: TimeSliderMode;
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

    public updateTimeSliderWidget = async (
        widget: EsriTimeSlider,
        webMap: WebMap
    ): Promise<void> => {
        // Reset model with default values.
        this.layout = "auto";
        this.loop = true;
        this.playRate = 1000;
        this.mode = "time-window";
        this.timeVisible = false;
        // Check the web map for existing time slider config.
        if (webMap?.widgets?.timeSlider) {
            const timeSlider = webMap.widgets.timeSlider;
            await this._updateWidgetFromWebMapTimeSlider(
                widget,
                timeSlider,
                webMap
            );
        } else {
            // Extract slider min and max range from the web map layers.
            await this._updateWidgetFromLayerTimeInfos(widget, webMap);
        }
        // This is only asynchronous when updating the widget from layer time
        // infos.
        // Sync model properties with the time slider widget.
        widget.layout = this.layout;
        widget.loop = this.loop;
        widget.playRate = this.playRate;
        widget.mode = this.mode;
        widget.timeVisible = this.timeVisible;
        this.widget = widget;
    };

    private _updateWidgetFromLayerTimeInfos = async (
        widget: EsriTimeSlider,
        map: __esri.Map
    ): Promise<void> => {
        let start, end: Date;
        let timeVisible: boolean;
        for (const tempLayer of map.layers.toArray()) {
            const layer = tempLayer as FeatureLayer;
            await layer.load();
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
                if (layer.timeInfo) {
                    if (!timeVisible) {
                        timeVisible = layer.timeInfo["useTime"];
                        break;
                    }
                }
            }
        }
        widget.fullTimeExtent = new TimeExtent({ start, end });
        // Ensure time slider playback will end on the latest date in the full
        // time extent.
        if (
            widget.effectiveStops?.[widget.effectiveStops.length - 1] <
            widget.fullTimeExtent.end
        ) {
            widget.effectiveStops.push(widget.fullTimeExtent.end);
        }
        this.timeVisible = timeVisible;
    };

    private _updateWidgetFromWebMapTimeSlider = async (
        widget: EsriTimeSlider,
        timeSlider: __esri.WebMapTimeSlider,
        map: WebMap
    ): Promise<void> => {
        if (timeSlider.fullTimeExtent) {
            widget.fullTimeExtent = timeSlider.fullTimeExtent;
        } else {
            widget.fullTimeExtent = timeSlider.currentTimeExtent;
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
        // Set properties to model from time slider config.
        if (timeSlider.loop) {
            this.loop = widget.loop;
        }
        if (timeSlider.stopDelay) {
            this.playRate = widget.playRate;
        }
        if (timeSlider.numThumbs === 1) {
            this.mode = "instant";
        } else {
            this.mode = "time-window";
        }
        // Need to find the timeVisible boolean inside layer infos - it isn't in
        // the time slider config.
        let timeVisible = false;
        for (const tempLayer of map.layers.toArray()) {
            const layer = tempLayer as FeatureLayer;
            await layer.load();
            if (layer.timeInfo) {
                if (!timeVisible) {
                    timeVisible = layer.timeInfo["useTime"];
                    break;
                }
            }
        }
        this.timeVisible = timeVisible;
    };

    protected _getSerializableProperties(): PropertyDefs<TimeSliderModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
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
