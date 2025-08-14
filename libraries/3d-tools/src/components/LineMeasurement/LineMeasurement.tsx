import type Accessor from "@arcgis/core/core/Accessor";
import DirectLineMeasurement3DWidget from "@arcgis/core/widgets/DirectLineMeasurement3D";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";

import type LineMeasurementModel from "./LineMeasurementModel";

export type AreaMeasurementProps = MapWidgetProps<
    LineMeasurementModel & Accessor
>;

const DirectLineMeasurement3DWidgetWrapper = createEsriMapWidget(
    DirectLineMeasurement3DWidget as MapWidgetConstructor<DirectLineMeasurement3DWidget>,
    true,
    true
);

export default function LineMeasurement(
    props: AreaMeasurementProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<DirectLineMeasurement3DWidget>();

    useWatchAndRerender(map, ["map", "viewMode"]);
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
        <DirectLineMeasurement3DWidgetWrapper
            onWidgetCreated={setWidget}
            {...props}
            sx={{ pb: 2 }}
        >
            {widget?.viewModel?.state === "measured" && (
                <Link
                    sx={{ m: 2, cursor: "pointer" }}
                    onClick={() => widget.viewModel.clear()}
                >
                    language-web-incubator-common-clear
                </Link>
            )}
        </DirectLineMeasurement3DWidgetWrapper>
    );
}
