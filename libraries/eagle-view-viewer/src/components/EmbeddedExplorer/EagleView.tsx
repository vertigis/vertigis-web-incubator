import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import type { EagleViewModel } from ".";
import { createEagleViewScript, type WindowWithEv } from "./embedded-explorer";

const selectorsToTrim = ["h1", "h2", "h3", "h4", "h5", "h6", "body", "label"];

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
                view: model.getPointForEagleView(true),
            });

            /**
             * EagleView pollutes the page with inline styles that override
             * global styles. This is a workaround to remove those styles.
             */
            const newStyles = [...document.styleSheets].filter(
                (style) => !previousStyle.includes(style)
            );
            newStyles.forEach((style) => {
                const rules = [...style.cssRules];
                for (let index = rules.length - 1; index >= 0; index--) {
                    const rule = rules[index];
                    if (
                        rule instanceof CSSStyleRule &&
                        selectorsToTrim.some(
                            (selector) => rule.selectorText === selector
                        )
                    ) {
                        style.deleteRule(index);
                    }
                }
            });
        };

        const evScriptElt = document.getElementById("embedded-explorer-widget");
        const previousStyle = [...document.styleSheets];
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
            requestAnimationFrame(() => mountEmbeddedExplorer());
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
