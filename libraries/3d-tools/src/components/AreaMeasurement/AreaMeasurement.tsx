import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import AreaMeasurement2DWidget from "@arcgis/core/widgets/AreaMeasurement2D";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";
import { AreaMeasurementModel } from ".";

import "./AreaMeasurement.css";
import { useWatchAndRerender } from "@vertigis/web/ui";

const AreaMeasurement3DWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<
        AreaMeasurementModel & Accessor,
        AreaMeasurement3DWidget
    >(AreaMeasurement3DWidget);

const AreaMeasurement2DWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<
        AreaMeasurementModel & Accessor,
        AreaMeasurement3DWidget
    >(AreaMeasurement2DWidget);

export default function AreaMeasurement3D(
    props: LayoutElementProperties<AreaMeasurementModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "scene") {
        return <AreaMeasurement3DWrapper {...props}></AreaMeasurement3DWrapper>;
    } else {
        return <AreaMeasurement2DWrapper {...props}></AreaMeasurement2DWrapper>;
    }
}
