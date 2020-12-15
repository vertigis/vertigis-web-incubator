import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Viewer, TransitionMode } from "mapillary-js";
import {
    LayoutElement,
    LayoutElementProperties,
} from "@vertigis/web/components";
import IconButton from "@vertigis/web/ui/IconButton";
import Sync from "@vertigis/web/ui/icons/Sync";
import CenterMap from "@vertigis/web/ui/icons/CenterMap";

// Import the necessary CSS for the Mapillary viewer to be styled correctly.
import "mapillary-js/dist/mapillary.min.css";
import MapillaryModel from "./MapillaryModel";
import "./Mapillary.css";
import { useWatchAndRerender } from "@vertigis/web/ui/hooks";

// This line should be removed when this issue is resolved:
// https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/908
declare const ResizeObserver;

export default function Mapillary(
    props: LayoutElementProperties<MapillaryModel>
): React.ReactElement {
    const { model } = props;
    const mlyRootEl = useRef<HTMLDivElement>();

    const onSyncToggle = () =>
        (model.synchronizePosition = !model.synchronizePosition);
    const onRecenter = () => void model.recenter();

    useWatchAndRerender(model, "synchronizePosition");

    useEffect(() => {
        const mapillary = new Viewer({
            container: mlyRootEl.current,
            apiClient: model.mapillaryKey,
        });
        mapillary.setTransitionMode(TransitionMode.Instantaneous);
        model.mapillary = mapillary;

        const handleViewportResize = () => {
            mapillary.resize();
        };

        // Viewer size is dynamic so resize should be called every time the viewport size changes.
        const resizeObserver = new ResizeObserver(handleViewportResize);
        const viewportDiv = mlyRootEl.current;
        resizeObserver.observe(viewportDiv);

        // These handlers are necessary as Mapillary cannot handle the many
        // update events caused by dragging the location marker. We'll only
        // handle the last one fired when the mouse button is released.
        const mouseDownHandler = (): void =>
            (model.currentMarkerPosition = undefined);
        const mouseUpHandler = (): void => {
            if (
                model.mapillary?.isNavigable &&
                !model.updating &&
                model.currentMarkerPosition
            ) {
                model.updating = true;

                const { latitude, longitude } = model.currentMarkerPosition;
                model.currentMarkerPosition = undefined;

                void model.moveCloseToPosition(latitude, longitude);
            }
        };
        document.body.addEventListener("mousedown", mouseDownHandler);
        document.body.addEventListener("mouseup", mouseUpHandler);

        // Clean up when this component is unmounted from the DOM.
        return () => {
            // Remove listeners.
            document.body.removeEventListener("mousedown", mouseDownHandler);
            document.body.removeEventListener("mouseup", mouseUpHandler);
            resizeObserver.unobserve(viewportDiv);

            // Clear out the Mapillary instance property. This will take care of
            // cleaning up.
            model.mapillary = undefined;
        };
    }, [model, model.id, model.mapillaryKey]);

    return (
        <LayoutElement {...props} stretch>
            <div>
                <IconButton
                    className={clsx(
                        "Mapillary-button",
                        "Mapillary-sync-button",
                        { selected: model.synchronizePosition }
                    )}
                    onClick={onSyncToggle}
                >
                    <Sync
                        color={
                            model.synchronizePosition ? "primary" : "disabled"
                        }
                    />
                </IconButton>
                <IconButton
                    className="Mapillary-button Mapillary-recenter-button"
                    onClick={onRecenter}
                >
                    <CenterMap />
                </IconButton>
            </div>
            <div className="Mapillary-map-container">
                <div ref={mlyRootEl} />
            </div>
        </LayoutElement>
    );
}
