import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import ShadowCastWidget from "@arcgis/core/widgets/ShadowCast";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";
import { AreaMeasurementModel } from "../AreaMeasurement";

import "./ShadowCast.css";

const ShadowCastWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<AreaMeasurementModel & Accessor, ShadowCastWidget>(
        ShadowCastWidget
    );

export default function ShadowCast(
    props: LayoutElementProperties<AreaMeasurementModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return <ShadowCastWrapper {...props}></ShadowCastWrapper>;
}
