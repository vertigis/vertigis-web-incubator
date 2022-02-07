import { ReactElement } from "react";
import ElevationProfileWidget from "@arcgis/core/widgets/ElevationProfile";
import type Accessor from "@arcgis/core/core/Accessor";
import { useWatchAndRerender } from "@vertigis/web/ui";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";

import { ElevationProfileModel } from ".";

export type ElevationProfileWidgetProps = MapWidgetProps<
    ElevationProfileModel & Accessor
>;

const ElevationProfileWidgetWrapper = createEsriMapWidget<
    ElevationProfileModel & Accessor,
    ElevationProfileWidget
>(ElevationProfileWidget, false, true);

export default function ElevationProfile(
    props: ElevationProfileWidgetProps
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
