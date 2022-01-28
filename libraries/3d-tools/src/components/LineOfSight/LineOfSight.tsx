import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import LineOfSightWidget from "@arcgis/core/widgets/LineOfSight";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";
import { AreaMeasurementModel } from "../AreaMeasurement";

import "./LineOfSight.css";

const LineOfSightWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<AreaMeasurementModel & Accessor, LineOfSightWidget>(
        LineOfSightWidget
    );

export default function AreaMeasurement3D(
    props: LayoutElementProperties<AreaMeasurementModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return <LineOfSightWrapper {...props}></LineOfSightWrapper>;
}
