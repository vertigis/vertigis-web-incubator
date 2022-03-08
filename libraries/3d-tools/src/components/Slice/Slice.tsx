import { ReactElement, useEffect, useState, useRef } from "react";
import SliceWidget from "@arcgis/core/widgets/Slice";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
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
>(SliceWidget, true, true);

export default function Slice(props: SliceWidgetProps): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<SliceWidget>();

    const containerRef = useRef<HTMLDivElement>();
    useWatchAndRerender(map, ["map", "isSwitchingViewMode"]);
    useWatchAndRerender(model, ["title", "tiltEnabled"]);
    useWatchAndRerender(widget?.viewModel, "state");
    useEffect(() => {
        if (!widget) {
            return;
        }

        widget.label = model.title;
        widget.viewModel.tiltEnabled = model.tiltEnabled;
    }, [map, model.tiltEnabled, model.title, widget]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
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
        observer.observe(containerRef.current, {
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
        widget?.viewModel.state === "sliced" ||
        widget?.viewModel.state === "slicing";

    return (
        <div ref={containerRef} className="gcx-component">
            <SliceWidgetWrapper
                onWidgetCreated={setWidget}
                {...props}
                sx={{ background: "white", pb: "1.5rem" }}
            >
                {widgetIsSlicing && (
                    <Link
                        sx={{ m: "1.5rem", cursor: "pointer" }}
                        onClick={() => widget.viewModel.clear()}
                    >
                        language-web-incubator-common-clear
                    </Link>
                )}
            </SliceWidgetWrapper>
        </div>
    );
}
