import { ReactElement } from "react";

import ShadowCastWidget from "@arcgis/core/widgets/ShadowCast";
import { Theme, useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { useEffect, useState } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
    MapWidgetConstructor,
} from "@vertigis/web/ui/esriUtils";
import ShadowCastModel from "./ShadowCastModel";

export type ShadowCastModelWidgetProps = MapWidgetProps<
    ShadowCastModel & Accessor
>;

const ShadowCastWrapper = createEsriMapWidget<
    ShadowCastModel & Accessor,
    ShadowCastWidget
>(ShadowCastWidget as MapWidgetConstructor<ShadowCastWidget>, true, true);

const widgetStyle = (theme: Theme) => ({
    "& calcite-select": {
        "--calcite-select-font-size": theme.typography.fontSize,
    },
    "&": {
        "--calcite-font-size--2": theme.typography.fontSize,
    },
});

export default function ShadowCast(
    props: ShadowCastModelWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ShadowCastWidget>();

    useWatchAndRerender(map, ["map", "isSwitchingViewMode"]);
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
        if (widget.viewModel) {
            widget.viewModel.visualizationType = model.visualizationType;
        }
    }, [
        widget,
        widget?.viewModel,
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
            sx={widgetStyle}
            {...props}
        ></ShadowCastWrapper>
    );
}
