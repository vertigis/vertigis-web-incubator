import { ReactElement, useState, useEffect } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
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
        ></DirectLineMeasurement3DWidgetWrapper>
    );
}
