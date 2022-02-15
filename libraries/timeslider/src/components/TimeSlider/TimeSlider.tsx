import React, { ComponentType, FC, useCallback } from "react";
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";
import TimeSliderModel from "./TimeSliderModel";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import "./TimeSlider.css";
import { useWatch, useWatchAndRerender } from "@vertigis/web/ui";
import WebMap from "@arcgis/core/WebMap";

export type TimeSliderProps = MapWidgetProps<TimeSliderModel, EsriTimeSlider>;
const TimeSliderWrapper: ComponentType<TimeSliderProps> = createEsriMapWidget<
    TimeSliderModel,
    EsriTimeSlider
>(EsriTimeSlider, undefined, true);

const TimeSlider: FC<TimeSliderProps> = (props) => {
    const model: TimeSliderModel = props.model;

    // Any time the Time Slider model properties change, we need to re-render
    // the component so our UI is consistent, as well as set the Esri widget
    // configuration.
    useWatchAndRerender(model, [
        "layout",
        "loop",
        "playRate",
        "mode",
        "overrideStops",
        "timeInterval",
        "timeIntervalUnit",
        "timeVisible",
        "map.map",
    ]);
    useWatch(
        model,
        [
            "layout",
            "loop",
            "playRate",
            "mode",
            "overrideStops",
            "timeInterval",
            "timeIntervalUnit",
            "timeVisible",
        ],
        (newValue, _oldValue, propertyName) => {
            if (model.widget) {
                model[propertyName] = newValue;
            }
        }
    );
    useWatch(
        model,
        "map.map",
        (newMap) => {
            // Only update the model if the web map has changed.
            if (model.widget) {
                model.widget.stop();
                // Check the web map for existing time slider config
                model.updateTimeSliderWidget(model.widget, newMap);
            }
        },
        [model.map.view]
    );

    const onWidgetCreated = useCallback(
        (widget: EsriTimeSlider) => {
            const map = model.map;

            // Synchronize values from model.
            if (!map?.map) {
                return;
            }

            const webMap = map.map as WebMap;
            model.updateTimeSliderWidget(widget, webMap);
        },
        [model]
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
            stretch={true}
        />
    );
};

export default TimeSlider;
