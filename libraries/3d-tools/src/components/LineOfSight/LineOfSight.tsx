import type Accessor from "@arcgis/core/core/Accessor";
import LineOfSightWidget from "@arcgis/core/widgets/LineOfSight";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import type LineOfSightModel from "./LineOfSightModel";

export type LineOfSightWidgetProps = MapWidgetProps<
    LineOfSightModel & Accessor
>;

const LineOfSightWrapper = createEsriMapWidget(
    LineOfSightWidget as MapWidgetConstructor<LineOfSightWidget>,
    true,
    true
);

export default function LineOfSight(
    props: LineOfSightWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<LineOfSightWidget>();

    useWatchAndRerender(map, ["map", "viewMode"]);
    useWatchAndRerender(widget?.viewModel, "state");
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.label = model.title;
    }, [widget, model.title]);

    if (map.viewMode === "map") {
        return null;
    }

    const widgetIsActive =
        widget?.viewModel?.state === "creating" ||
        widget?.viewModel?.state === "created";

    return (
        <LineOfSightWrapper
            onWidgetCreated={setWidget}
            {...props}
            sx={{ pb: 2 }}
        >
            {widgetIsActive && (
                <Link
                    sx={{ m: 2, cursor: "pointer" }}
                    onClick={() => widget.viewModel.clear()}
                >
                    language-web-incubator-common-clear
                </Link>
            )}
        </LineOfSightWrapper>
    );
}
