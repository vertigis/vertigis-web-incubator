import type Accessor from "@arcgis/core/core/Accessor";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";

import type AreaMeasurementModel from "./AreaMeasurementModel";

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
        <AreaMeasurement3DWrapper
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
        </AreaMeasurement3DWrapper>
    );
}
