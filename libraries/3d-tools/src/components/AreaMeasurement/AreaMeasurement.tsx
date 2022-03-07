import { ReactElement, useState, useEffect } from "react";
import { useWatchAndRerender } from "@vertigis/web/ui";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import type Accessor from "@arcgis/core/core/Accessor";
import AreaMeasurementModel from "./AreaMeasurementModel";

export type AreaMeasurementProps = MapWidgetProps<
    AreaMeasurementModel & Accessor
>;

const AreaMeasurement3DWrapper = createEsriMapWidget<
    AreaMeasurementModel & Accessor,
    AreaMeasurement3DWidget
>(AreaMeasurement3DWidget, true, true);

export default function AreaMeasurement3D(
    props: AreaMeasurementProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<AreaMeasurement3DWidget>();

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
        <AreaMeasurement3DWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></AreaMeasurement3DWrapper>
    );
}
