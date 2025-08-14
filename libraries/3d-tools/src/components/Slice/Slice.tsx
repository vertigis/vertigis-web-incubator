import type Accessor from "@arcgis/core/core/Accessor";
import SliceWidget from "@arcgis/core/widgets/Slice";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import type SliceModel from "./SliceModel";

export type SliceWidgetProps = MapWidgetProps<SliceModel & Accessor>;

const SliceWidgetWrapper = createEsriMapWidget(
    SliceWidget as MapWidgetConstructor<SliceWidget>,
    true,
    true
);

export default function Slice(props: SliceWidgetProps): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<SliceWidget>();

    useWatchAndRerender(map, ["map", "viewMode"]);
    useWatchAndRerender(model, ["title", "tiltEnabled"]);
    useWatchAndRerender(widget?.viewModel, "state");

    useEffect(() => {
        if (!widget) {
            return;
        }

        widget.label = model.title;
        if (widget.viewModel) {
            widget.viewModel.tiltEnabled = model.tiltEnabled;
        }
    }, [map, model.tiltEnabled, model.title, widget, widget?.viewModel]);

    useEffect(() => {
        if (!widget?.container) {
            return undefined;
        }

        const observer = new MutationObserver((results) => {
            results.forEach((mutation) => {
                const buttonAdded = !![...mutation.addedNodes.values()].find(
                    (node) => {
                        const className: string = node["className"] ?? "";
                        return className.includes("esri-slice__cancel-button");
                    }
                );
                if (buttonAdded) {
                    map["_suppressMapClick"] = true;
                }

                const buttonRemoved = !![
                    ...mutation.removedNodes.values(),
                ].find((node) => {
                    const className: string = node["className"] ?? "";
                    return className.includes("esri-slice__cancel-button");
                });
                if (buttonRemoved) {
                    map["_suppressMapClick"] = false;
                }
            });
        });
        observer.observe(widget.container, {
            subtree: true,
            childList: true,
        });

        return () => {
            observer.disconnect();
            map["_suppressMapClick"] = false;
        };
    }, [widget, map]);

    if (map.viewMode === "map") {
        return null;
    }

    const widgetIsSlicing =
        widget?.viewModel?.state === "sliced" ||
        widget?.viewModel?.state === "slicing";

    return (
        <SliceWidgetWrapper
            onWidgetCreated={setWidget}
            {...props}
            sx={{ pb: 2 }}
        >
            {widgetIsSlicing && (
                <Link
                    sx={{ m: 2, cursor: "pointer" }}
                    onClick={() => widget.viewModel.clear()}
                >
                    language-web-incubator-common-clear
                </Link>
            )}
        </SliceWidgetWrapper>
    );
}
