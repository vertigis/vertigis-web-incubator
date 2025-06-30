import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import type { EagleViewModel } from ".";
import { createEagleViewScript, type WindowWithEv } from "./embedded-explorer";

export default function EagleView(
    props: LayoutElementProperties<EagleViewModel>
): React.ReactElement {
    const { model } = props;

    useEffect(() => {
        const window = document.defaultView as WindowWithEv;
        const mountEmbeddedExplorer = () => {
            const explorer = new window.ev.EmbeddedExplorer();
            model.e3 = explorer.mount("eagle-view-map", {
                apiKey: model.apiKey,
                view: model.getPointForEagleView(),
            });
        };

        const evScriptElt = document.getElementById("embedded-explorer-widget");

        if (evScriptElt == null) {
            // This is required to get the EagleView script running.
            window.define("React", React);
            window.define("ReactDOM", ReactDOM);
            window.define("react-virtualized", undefined);
            window.define("recharts", undefined);
            const embedded_explorer_script = createEagleViewScript();

            // We need to force the necessary modules to load.
            embedded_explorer_script.addEventListener("load", async () => {
                window.require(["lib"], mountEmbeddedExplorer);
            });

            document.body.appendChild(embedded_explorer_script);
        } else {
            mountEmbeddedExplorer();
        }

        return () => {
            model.e3 = undefined;
        };
    }, [model]);

    return (
        <LayoutElement {...props} stretch>
            <div id="eagle-view-map"></div>
        </LayoutElement>
    );
}
