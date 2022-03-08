import { ReactElement, useState, useEffect } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import Link from "@vertigis/web/ui/Link";
import DirectLineMeasurement3DWidget from "@arcgis/core/widgets/DirectLineMeasurement3D";
import type Accessor from "@arcgis/core/core/Accessor";
import LineMeasurementModel from "./LineMeasurementModel";
import { useWatchAndRerender } from "@vertigis/web/ui";

export type AreaMeasurementProps = MapWidgetProps<
    LineMeasurementModel & Accessor
>;

const DirectLineMeasurement3DWidgetWrapper = createEsriMapWidget<
    LineMeasurementModel & Accessor,
    DirectLineMeasurement3DWidget
>(DirectLineMeasurement3DWidget, true, true);

export default function LineMeasurement(
    props: AreaMeasurementProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<DirectLineMeasurement3DWidget>();

    useWatchAndRerender(map, ["map", "isSwitchingViewMode"]);
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
        <DirectLineMeasurement3DWidgetWrapper
            onWidgetCreated={setWidget}
            {...props}
            sx={{ background: "white", pb: "1.5rem" }}
        >
            <Link
                sx={{ m: "1.5rem", cursor: "pointer" }}
                onClick={() => widget.viewModel.clear()}
            >
                language-web-incubator-common-clear
            </Link>
        </DirectLineMeasurement3DWidgetWrapper>
    );
}
