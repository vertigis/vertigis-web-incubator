import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import DaylightWidget from "@arcgis/core/widgets/Daylight";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";
import { AreaMeasurementModel } from "../AreaMeasurement";

import "./Daylight.css";

const DaylightWidgetWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<AreaMeasurementModel & Accessor, DaylightWidget>(
        DaylightWidget
    );

export default function Daylight(
    props: LayoutElementProperties<AreaMeasurementModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return <DaylightWidgetWrapper {...props}></DaylightWidgetWrapper>;
}
