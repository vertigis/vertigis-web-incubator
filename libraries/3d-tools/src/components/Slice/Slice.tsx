import { ReactElement, useEffect, useState } from "react";
import SliceWidget from "@arcgis/core/widgets/Slice";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";

import SliceModel from "./SliceModel";

export type SliceWidgetProps = MapWidgetProps<SliceModel & Accessor>;

const SliceWidgetWrapper = createEsriMapWidget<
    SliceModel & Accessor,
    SliceWidget
>(SliceWidget, false, true);

export default function Slice(props: SliceWidgetProps): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<SliceWidget>();

    useWatchAndRerender(map, "map");
    useWatchAndRerender(model, ["title", "tiltEnabled"]);
    useEffect(() => {
        if (!widget) {
            return;
        }

        map["_suppressMapClick"] = true;
        widget.label = model.title;
        widget.viewModel.tiltEnabled = model.tiltEnabled;

        return () => {
            map["_suppressMapClick"] = true;
        };
    }, [map, model.tiltEnabled, model.title, widget]);

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <SliceWidgetWrapper
            stretch
            onWidgetCreated={setWidget}
            {...props}
        ></SliceWidgetWrapper>
    );
}
