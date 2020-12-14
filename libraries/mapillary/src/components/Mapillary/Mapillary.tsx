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
import EmbeddedMapModel from "./MapillaryModel";
import "./Mapillary.css";
import { useWatchAndRerender } from "@vertigis/web/ui/hooks";

// This line should be removed when this issue is resolved:
// https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/908
declare const ResizeObserver;

export default function Mapillary(
    props: LayoutElementProperties<EmbeddedMapModel>
): React.ReactElement {
    const { model } = props;
    const mlyRootEl = useRef<HTMLDivElement>();

    const onSyncToggle = () => {
        model.sync = !model.sync;
    };

    const onRecenter = () => {
        void model.recenter();
    };

    useWatchAndRerender(model, "sync");

    useEffect(() => {
        const mapillary = new Viewer(mlyRootEl.current, model.mapillaryKey);
        mapillary.setTransitionMode(TransitionMode.Instantaneous);
        model.mapillary = mapillary;

        const handleViewportResize = () => {
            mapillary.resize();
        };

        // Viewer size is dynamic so resize should be called every time the viewport size changes.
        const resizeObserver = new ResizeObserver(handleViewportResize);
        const viewportDiv = mlyRootEl.current;
        resizeObserver.observe(viewportDiv);

        // Clean up when this component is unmounted from the DOM.
        return () => {
            resizeObserver.unobserve(viewportDiv);
            // Clear out the Mapillary instance property. This will take care of
            // cleaning up.
            model.mapillary = undefined;
        };
    }, [model, model.id, model.mapillaryKey]);

    return (
        <LayoutElement {...props} stretch>
            <div className="Mapillary-ui-container">
                <IconButton
                    className={clsx(
                        "Mapillary-button",
                        "Mapillary-sync-button",
                        { selected: model.sync }
                    )}
                    onClick={onSyncToggle}
                >
                    <Sync color={model.sync ? "primary" : "disabled"} />
                </IconButton>
                <IconButton
                    className="Mapillary-button Mapillary-recenter-button"
                    onClick={onRecenter}
                >
                    <CenterMap />
                </IconButton>
            </div>
            <div
                className={"Mapillary-map-container gcx-component gcx-stretchy"}
            >
                <div ref={mlyRootEl} />
            </div>
        </LayoutElement>
    );
}
