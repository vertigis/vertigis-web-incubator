import { ReactElement, useState, useEffect } from "react";
import { useWatchAndRerender } from "@vertigis/web/ui";
import {
    createEsriMapWidget,
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import Link from "@vertigis/web/ui/Link";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import type Accessor from "@arcgis/core/core/Accessor";
import AreaMeasurementModel from "./AreaMeasurementModel";

export type AreaMeasurementProps = MapWidgetProps<
    AreaMeasurementModel & Accessor
>;

const AreaMeasurement3DWrapper = createEsriMapWidget(
    AreaMeasurement3DWidget as MapWidgetConstructor<AreaMeasurement3DWidget>,
    true,
    true
);

export default function AreaMeasurement3D(
    props: AreaMeasurementProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<AreaMeasurement3DWidget>();

    useWatchAndRerender(map, ["map", "isSwitchingViewMode"]);
    useWatchAndRerender(widget?.viewModel, "state");
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.label = model.title;
    }, [widget, model.title]);

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <AreaMeasurement3DWrapper
            onWidgetCreated={setWidget}
            {...props}
            sx={{ background: "white", pb: "1.5rem" }}
        >
            {widget?.viewModel?.state === "measured" && (
                <Link
                    sx={{ m: "1.5rem", cursor: "pointer" }}
                    onClick={() => widget.viewModel.clear()}
                >
                    language-web-incubator-common-clear
                </Link>
            )}
        </AreaMeasurement3DWrapper>
    );
}
