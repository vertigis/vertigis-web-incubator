import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import AreaMeasurement3DWidget from "@arcgis/core/widgets/AreaMeasurement3D";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";
import { AreaMeasurement3DModel } from ".";

import "./AreaMeasurement3D.css";

const AreaMeasurement3DWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<
        AreaMeasurement3DModel & Accessor,
        AreaMeasurement3DWidget
    >(AreaMeasurement3DWidget);

export default function AreaMeasurement3D(
    props: LayoutElementProperties
): ReactElement {
    return <AreaMeasurement3DWrapper {...props}></AreaMeasurement3DWrapper>;
}
