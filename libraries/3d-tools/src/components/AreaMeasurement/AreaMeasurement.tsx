import { ReactElement, useState, useEffect } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { useWatchAndRerender } from "@vertigis/web/ui";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import AreaMeasurement2DWidget from "@arcgis/core/widgets/AreaMeasurement2D";
import type Accessor from "@arcgis/core/core/Accessor";

import { AreaMeasurementModel } from ".";

export type DaylightWidgetProps = MapWidgetProps<
    AreaMeasurementModel & Accessor
>;

const AreaMeasurement3DWrapper = createEsriMapWidget<
    AreaMeasurementModel & Accessor,
    AreaMeasurement3DWidget
>(AreaMeasurement3DWidget, false, true);

const AreaMeasurement2DWrapper = createEsriMapWidget<
    AreaMeasurementModel & Accessor,
    AreaMeasurement2DWidget
>(AreaMeasurement2DWidget, false, true);

export default function AreaMeasurement3D(
    props: DaylightWidgetProps
): ReactElement {
    const { map, regionService } = props.model;
    const [widget, setWidget] = useState<
        AreaMeasurement2DWidget | AreaMeasurement3DWidget
    >();
    useWatchAndRerender(regionService, "measurementSystem");
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.unit = regionService.measurementSystem;
    }, [widget, regionService.measurementSystem]);

    if (map.viewMode === "scene") {
        return (
            <AreaMeasurement3DWrapper
                onWidgetCreated={setWidget}
                {...props}
            ></AreaMeasurement3DWrapper>
        );
    } else {
        return (
            <AreaMeasurement2DWrapper
                onWidgetCreated={setWidget}
                {...props}
            ></AreaMeasurement2DWrapper>
        );
    }
}
