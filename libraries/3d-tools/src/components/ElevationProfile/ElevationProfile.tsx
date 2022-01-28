import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import ElevationProfileWidget from "@arcgis/core/widgets/ElevationProfile";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";

import "./ElevationProfile.css";
import { ElevationProfileModel } from ".";

const ElevationProfileWidgetWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<
        ElevationProfileModel & Accessor,
        ElevationProfileWidget
    >(ElevationProfileWidget);

export default function ElevationProfile(
    props: LayoutElementProperties<ElevationProfileModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <ElevationProfileWidgetWrapper
            {...props}
        ></ElevationProfileWidgetWrapper>
    );
}
