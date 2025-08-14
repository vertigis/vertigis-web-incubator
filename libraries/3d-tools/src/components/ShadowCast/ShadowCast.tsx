import type Accessor from "@arcgis/core/core/Accessor";
import ShadowCastWidget from "@arcgis/core/widgets/ShadowCast";
import { useWatchAndRerender, styled } from "@vertigis/web/ui";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import type ShadowCastModel from "./ShadowCastModel";

export type ShadowCastModelWidgetProps = MapWidgetProps<
    ShadowCastModel & Accessor
>;

const ShadowCastWrapper = createEsriMapWidget(
    ShadowCastWidget as MapWidgetConstructor<ShadowCastWidget>,
    true,
    true
);

const StyledShadowCastWrapper = styled(ShadowCastWrapper)(
    ({ theme: { typography } }) => ({
        "--calcite-ui-text-1": "var(--primaryForeground)",
        "--calcite-font-size--2": typography.fontSize,
        "& .esri-widget": {
            width: "100%",
        },
        "& .calcite-select": {
            "--calcite-select-font-size": typography.fontSize,
        },
    })
);

export default function ShadowCast(
    props: ShadowCastModelWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ShadowCastWidget>();

    useWatchAndRerender(map, ["map", "viewMode"]);
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
        <StyledShadowCastWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></StyledShadowCastWrapper>
    );
}
