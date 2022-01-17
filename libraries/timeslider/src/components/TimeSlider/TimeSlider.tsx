import { ReactElement, useCallback, useState } from "react";
import { generateUuid } from "@vertigis/arcgis-extensions/utilities/uuid";
import { LayoutElementProperties } from "@vertigis/web/components";
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";
import TimeSliderModel from "./TimeSliderModel";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
//import { createEsriMapWidget, MapWidgetProps } from "./EsriMapWidget";
import "./TimeSlider.css";
import React, { ComponentType } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TimeExtent from "@arcgis/core/TimeExtent";
import { useWatch, useWatchAndRerender } from "@vertigis/web/ui";
import { TimeSliderLayout, TimeSliderMode } from "./designer";
//import { MapModel } from "../../../../../../geocortex-web-viewer/src/common/components/map";

export type TimeSliderProps = MapWidgetProps<TimeSliderModel, EsriTimeSlider>;
const TimeSliderWrapper: ComponentType<TimeSliderProps> = createEsriMapWidget<
    TimeSliderModel,
    EsriTimeSlider
>(EsriTimeSlider);

const TimeSlider = (
    props: LayoutElementProperties<TimeSliderModel>
): ReactElement => {
    // A unique DOM ID to be used for a11y purposes.
    const [selectId] = useState(generateUuid());
    const [widget, setWidget] = useState<EsriTimeSlider | null>();
    const model: TimeSliderModel = props.model;

    const updateFullTimeExtent = (
        map: __esri.Map,
        widget: EsriTimeSlider
    ): void => {
        let start, end;
        map.layers.forEach((tempLayer) => {
            const layer = tempLayer as FeatureLayer;
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
        });
        widget.fullTimeExtent = new TimeExtent({ start, end });
    };

    // Any time the Time Slider model properties change, we need to re-render
    // the component so our UI is consistent, as well as set the Esri widget
    // configuration.
    useWatchAndRerender(model, "layout");
    useWatch(model, "layout", (newValue) => {
        if (widget) {
            widget.stop();
            widget.layout = newValue as TimeSliderLayout;
        }
    });
    useWatchAndRerender(model, "loop");
    useWatch(model, "loop", (newValue) => {
        if (widget) {
            widget.stop();
            widget.loop = newValue as boolean;
        }
    });
    useWatchAndRerender(model, "playRate");
    useWatch(model, "playRate", (newValue) => {
        if (widget) {
            widget.stop();
            widget.playRate = newValue as number;
        }
    });
    useWatchAndRerender(model, "mode");
    useWatch(model, "mode", (newValue) => {
        if (widget) {
            widget.stop();
            widget.mode = newValue as TimeSliderMode;
            //const min = model.sliderMin;
            //const max = model.sliderMax;
            console.log(model);
            // if (widget.mode === "cumulative-from-start") {
            //     widget.timeExtent = new TimeExtent({start: null, end: max});
            // }
            // else if (widget.mode === "cumulative-from-end") {
            //     widget.timeExtent = new TimeExtent({start: min, end: null});
            // }
            // else {
            //     widget.timeExtent = new TimeExtent({start: min, end: min});
            // }
        }
    });
    useWatchAndRerender(model, "timeVisible");
    useWatch(model, "timeVisible", (newValue) => {
        if (widget) {
            widget.stop();
            widget.timeVisible = newValue as boolean;
        }
    });

    //Watch for map updates, as the overall time extent may be changed.
    useWatchAndRerender(model, "map.map");
    useWatch(
        model,
        "map.map",
        (newValue) => {
            console.log(model);
            if (widget) {
                widget.stop();
                updateFullTimeExtent(newValue, widget);
            }
        },
        [model, model.map]
    );

    console.log(model);

    const onWidgetCreated = useCallback(
        (widget: EsriTimeSlider) => {
            const map = model.map;

            // Synchronize values from model
            if (!map && !map.view) {
                return;
            }
            // Extract slider min and max range from the web map layers
            const view = map.view as MapView;
            if (view) {
                void view.when(() => {
                    updateFullTimeExtent(view.map, widget);
                });
            }
            // Set the default values from the model to the widget
            widget.layout = model.layout;
            widget.loop = model.loop;
            widget.playRate = model.playRate;
            widget.mode = model.mode;
            widget.timeVisible = model.timeVisible;
            setWidget(widget);
        },
        [
            model.map,
            model.layout,
            model.loop,
            model.playRate,
            model.mode,
            model.timeVisible,
        ]
    );
    const onWidgetDestroyed = useCallback(() => setWidget(null), []);

    return (
        <TimeSliderWrapper
            id={selectId}
            model={props.model}
            className="TimeSlider"
            preloadChildren={() => Promise.resolve()}
            onWidgetCreated={onWidgetCreated}
            onWidgetDestroyed={onWidgetDestroyed}
        />
    );
};

export default TimeSlider;
