import { ReactElement, useEffect, useState } from "react";
import LineOfSightWidget from "@arcgis/core/widgets/LineOfSight";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import LineOfSightModel from "./LineOfSightModel";

export type LineOfSightWidgetProps = MapWidgetProps<
    LineOfSightModel & Accessor
>;

const LineOfSightWrapper = createEsriMapWidget<
    LineOfSightModel & Accessor,
    LineOfSightWidget
>(LineOfSightWidget, true, true);

export default function LineOfSight(
    props: LineOfSightWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<LineOfSightWidget>();
    useWatchAndRerender(map, "map");
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
        <LineOfSightWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></LineOfSightWrapper>
    );
}
