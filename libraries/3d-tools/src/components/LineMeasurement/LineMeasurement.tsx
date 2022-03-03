import { ReactElement, useState, useEffect } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import DirectLineMeasurement3DWidget from "@arcgis/core/widgets/DirectLineMeasurement3D";
import type Accessor from "@arcgis/core/core/Accessor";
import LineMeasurementModel from "./LineMeasurementModel";

export type AreaMeasurementProps = MapWidgetProps<
    LineMeasurementModel & Accessor
>;

const DirectLineMeasurement3DWidgetWrapper = createEsriMapWidget<
    LineMeasurementModel & Accessor,
    DirectLineMeasurement3DWidget
>(DirectLineMeasurement3DWidget, false, true);

export default function LineMeasurement(
    props: AreaMeasurementProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<DirectLineMeasurement3DWidget>();
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
            stretch
            onWidgetCreated={setWidget}
            {...props}
        ></DirectLineMeasurement3DWidgetWrapper>
    );
}
