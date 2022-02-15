import { ReactElement, useEffect, useState } from "react";
import ElevationProfileWidget from "@arcgis/core/widgets/ElevationProfile";
import type Accessor from "@arcgis/core/core/Accessor";
import { useWatchAndRerender } from "@vertigis/web/ui";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import ElevationProfileModel from "./ElevationProfileModel";

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
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ElevationProfileWidget>();
    useWatchAndRerender(map, "map");
    useWatchAndRerender(model, ["title"]);
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
        <ElevationProfileWidgetWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></ElevationProfileWidgetWrapper>
    );
}
