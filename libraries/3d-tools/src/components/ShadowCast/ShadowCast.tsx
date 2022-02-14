import { ReactElement } from "react";

import ShadowCastWidget from "@arcgis/core/widgets/ShadowCast";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { useEffect, useState } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import ShadowCastModel from "./ShadowCastModel";

export type ShadowCastModelWidgetProps = MapWidgetProps<
    ShadowCastModel & Accessor
>;

const ShadowCastWrapper = createEsriMapWidget<
    ShadowCastModel & Accessor,
    ShadowCastWidget
>(ShadowCastWidget, false, true);

export default function ShadowCast(
    props: ShadowCastModelWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ShadowCastWidget>();
    useWatchAndRerender(map, "map");
    useWatchAndRerender(model, [
        "title",
        "timeRangeSlider",
        "timezone",
        "datePicker",
        "visualizationOptions",
        "colorPicker",
        "tooltip",
        "visualizationType",
    ]);
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.visibleElements = {
            timeRangeSlider: model.timeRangeSlider,
            timezone: model.timezone,
            datePicker: model.datePicker,
            visualizationOptions: model.visualizationOptions,
            colorPicker: model.colorPicker,
            tooltip: model.tooltip,
        };
        widget.label = model.title;
        widget.viewModel.visualizationType = model.visualizationType;
    }, [
        widget,
        model,
        model.title,
        model.timeRangeSlider,
        model.timezone,
        model.datePicker,
        model.visualizationOptions,
        model.colorPicker,
        model.tooltip,
        model.visualizationType,
    ]);

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <ShadowCastWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></ShadowCastWrapper>
    );
}