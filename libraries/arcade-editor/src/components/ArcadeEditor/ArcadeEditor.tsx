import { ArcgisArcadeEditor } from "@arcgis/coding-components-react";
import { CalciteScrim } from "@esri/calcite-components-react";
import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import Paper from "@vertigis/web/ui/Paper";
import { useEffect, useCallback, useState, type ReactElement } from "react";

import type ArcadeEditorModel from "./ArcadeEditorModel";

import "./ArcadeEditor.css";

const ArcadeEditor = (
    props: LayoutElementProperties<ArcadeEditorModel>
): ReactElement => {
    const [data, setData] = useState(null);

    // useCallback to prevent the function from being recreated when the component rebuilds
    const initializeTheEditor = useCallback(async () => {
        const data = await props.model.loadData();
        setData(data);
    }, [props.model]);

    // Register a function that will execute after the current render cycle
    useEffect(() => {
        initializeTheEditor().catch(console.error);
    }, [initializeTheEditor]);

    return (
        <LayoutElement
            {...props}
            stretch
            className="arcade-editor-webcomponent"
        >
            <Paper className="editor-wrapper">
                {data ? (
                    <ArcgisArcadeEditor
                        // Set the script on the editor
                        script="$feature"
                        // Log script change events
                        onArcgisScriptChange={async (e) => {
                            console.log("script:", e.detail);
                            // console.log("outputType on script:", await arcadeEditorElt.getOutputType());
                        }}
                        // Log editor diagnostics
                        onArcgisDiagnosticsChange={async (e) => {
                            console.log("diagnostics:", e.detail);
                        }}
                        // Tells Arcade editor to use the 'popup' profile and provides the necessary data used as
                        // definition for the profile variables. Feature Layer and Web Map instances are used by the
                        // Editor UX to help users understand the structure of data used.
                        // Note that for the $feature variable, we pass the feature layer instance as for definition
                        // the editor needs the metadata of the feature not an actual feature.
                        profile={{
                            id: "popup",
                            definitions: {
                                $feature: data.featureLayer,
                                $layer: data.featureLayer,
                                $map: data.webMap,
                                $datastore: data.featureLayer,
                            },
                        }}
                        // Tells Arcade editor to the following test data. The data provided must match the expected data for the
                        // profile used.
                        // Note that for test data, the feature must an instance of a feature. This is not used for user experience
                        // but for actually executing the the Arcade expression in the editor.
                        testData={{
                            profileVariableInstances: {
                                $feature: data.featureSet.features[0],
                                $layer: data.featureLayer,
                                $map: data.webMap,
                                $datastore: data.featureLayer.url,
                            },
                        }}
                    />
                ) : (
                    <CalciteScrim loading />
                )}
            </Paper>
        </LayoutElement>
    );
};

export default ArcadeEditor;
