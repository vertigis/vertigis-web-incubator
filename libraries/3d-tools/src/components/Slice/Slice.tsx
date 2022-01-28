import { ReactElement } from "react";
import { LayoutElementProperties } from "@vertigis/web/components";
import { createEsriMapWidget } from "../../common/EsriMapWidgets";
import SliceWidget from "@arcgis/core/widgets/Slice";
import { useWatchAndRerender } from "@vertigis/web/ui";
import type Accessor from "@arcgis/core/core/Accessor";
import { ComponentType } from "react";

import "./Slice.css";
import SliceModel from "./SliceModel";

const SliceWidgetWrapper: ComponentType<LayoutElementProperties> =
    createEsriMapWidget<SliceModel & Accessor, SliceWidget>(SliceWidget);

export default function ShadowCast(
    props: LayoutElementProperties<SliceModel>
): ReactElement {
    const { map } = props.model;
    useWatchAndRerender(map, "map");

    if (map.viewMode === "map") {
        return null;
    }

    return <SliceWidgetWrapper {...props}></SliceWidgetWrapper>;
}
