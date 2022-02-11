import { ReactElement } from "react";
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
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return <SliceWidgetWrapper {...props}></SliceWidgetWrapper>;
}
