import type WebMap from "@arcgis/core/WebMap";
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";
import { useWatch, useWatchAndRerender } from "@vertigis/web/ui";
import type { MapWidgetProps } from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import type { ComponentType, FC } from "react";
import React, { useCallback } from "react";

import type TimeSliderModel from "./TimeSliderModel";

import "./TimeSlider.css";

export type TimeSliderProps = MapWidgetProps<TimeSliderModel, EsriTimeSlider>;
const TimeSliderWrapper: ComponentType<TimeSliderProps> = createEsriMapWidget<
    TimeSliderModel,
    EsriTimeSlider
>(EsriTimeSlider, undefined, true);

const TimeSlider: FC<TimeSliderProps> = (props) => {
    const { model, ...other } = props;

    // Any time the Time Slider model properties change, we need to re-render
    // the component so our UI is consistent, as well as set the Esri widget
    // configuration.
    useWatchAndRerender(model, ["map.map"]);
    useWatch(
        model,
        "map.map",
        (newMap: WebMap) => {
            // Only update the model if the web map has changed.
            if (model.widget) {
                model.widget.stop();
                // Check the web map for existing time slider config
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
            onWidgetCreated={onWidgetCreated}
            onWidgetDestroyed={onWidgetDestroyed}
            stretch
            {...other}
        />
    );
};

export default TimeSlider;
