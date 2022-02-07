import { ReactElement } from "react";

import ShadowCastWidget from "@arcgis/core/widgets/ShadowCast";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { useEffect, useState } from "react";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { ShadowCastModel } from ".";

export type ShadowCastModelWidgetProps = MapWidgetProps<
    ShadowCastModel & Accessor
>;

const ShadowCastWrapper = createEsriMapWidget<
    ShadowCastModel & Accessor,
    ShadowCastWidget
>(ShadowCastWidget, false, true);

export default function ShadowCast(
    props: ShadowCastModelWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ShadowCastWidget>();
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
        <ShadowCastWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></ShadowCastWrapper>
    );
}
