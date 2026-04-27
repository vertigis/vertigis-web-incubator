import "@arcgis/ai-components/components/arcgis-assistant";
import "@arcgis/ai-components/components/arcgis-assistant-navigation-agent";
import "@arcgis/ai-components/components/arcgis-assistant-data-exploration-agent";
import "@arcgis/ai-components/components/arcgis-assistant-help-agent";
import type Collection from "@arcgis/core/core/Collection";
import { LayoutElement, type LayoutElementProperties } from "@vertigis/web/components";
import { useWatchAndRerender } from "@vertigis/web/ui";
import { useRef, type ReactElement } from "react";

import type ArcGISAssistantModel from "./ArcGISAssistantModel";
// TODO: This should be fixed when ESRI fixes their packaging.
import type {
    AssistantMessage,
    ChatMessage,
    Interrupt,
} from "../../../node_modules/@arcgis/ai-components/dist/components/arcgis-assistant/types";
import type { EsriComponentElement, EsriComponentProps } from "../EsriComponentWrapper";
import { wrapComponent } from "../EsriComponentWrapper";

/**
 * Properties that map to attributes on the ArcGIS Assistant webcomponent:
 * https://developers.arcgis.com/javascript/latest/references/ai-components/components/arcgis-assistant/#properties
 */
export interface ArcGISAssistantProps extends EsriComponentProps {
    copyEnabled?: boolean;
    description?: string;
    entryMessage?: string;
    feedbackEnabled?: boolean;
    heading?: string;
    keepSuggestedPrompts?: boolean;
    logEnabled?: boolean;
    suggestedPrompts?: string[];
}

/**
 * Event handlers for events fired by the ArcGIS Assistant webcomponent. These
 * are not serialized but can be assigned directly on the wrapped component.
 * https://developers.arcgis.com/javascript/latest/references/ai-components/components/arcgis-assistant/#events
 */
export interface ArcGISAssistantEvents {
    arcgisCancel?: (event: CustomEvent<void>) => void;
    arcgisError?: (event: CustomEvent<Error>) => void;
    arcgisFeedback?: (event: CustomEvent<AssistantMessage>) => void;
    arcgisInterrupt?: (event: CustomEvent<Interrupt>) => void;
    arcgisInterruptCancel?: (event: CustomEvent<void>) => void;
    arcgisInterruptSubmit?: (event: CustomEvent<string | boolean | string[]>) => void;
    arcgisReady?: (event: CustomEvent<void>) => void;
    arcgisSubmit?: (event: CustomEvent<string>) => void;
}

/**
 * Additional read only methods and properties are availble as attributes on the
 * ArcGIS Assistant webcomponent element, in addition to all of the assignable props.
 * https://developers.arcgis.com/javascript/latest/references/ai-components/components/arcgis-assistant/#methods
 */
export interface ArcGISAssistantElement extends ArcGISAssistantProps, EsriComponentElement {
    clearChatHistory: () => Promise<void>;
    componentOnReady: () => Promise<ArcGISAssistantElement>;
    submitMessage: (message: string) => Promise<void>;
    messages: Collection<ChatMessage>;
}

const AssistantComponent = wrapComponent<ArcGISAssistantProps & ArcGISAssistantEvents>("arcgis-assistant");
const DataExplorationAgent = wrapComponent("arcgis-assistant-data-exploration-agent");
const HelpAgent = wrapComponent("arcgis-assistant-help-agent");
const NavigationAgent = wrapComponent("arcgis-assistant-navigation-agent");

const ArcGISAssistant = (props: LayoutElementProperties<ArcGISAssistantModel>): ReactElement => {
    const { model } = props;
    useWatchAndRerender(model, [
        "copyEnabled",
        "description",
        "entryMessage",
        "feedbackEnabled",
        "heading",
        "keepSuggestedPrompts",
        "logEnabled",
        "suggestedPrompts",
    ]);

    model.componentRef = useRef<ArcGISAssistantElement>();

    const {
        componentRef,
        copyEnabled,
        description,
        entryMessage,
        feedbackEnabled,
        heading,
        keepSuggestedPrompts,
        logEnabled,
        suggestedPrompts,
    } = model;

    return (
        <LayoutElement {...props}>
            <AssistantComponent
                /** arcgisSubmit={(event: CustomEvent<string>) => alert(event.detail)} */
                containerProps={{ sx: { height: "1000px", width: "600px" } }}
                copyEnabled={copyEnabled}
                description={description}
                entryMessage={entryMessage}
                feedbackEnabled={feedbackEnabled}
                heading={heading}
                keepSuggestedPrompts={keepSuggestedPrompts}
                logEnabled={logEnabled}
                componentRef={componentRef}
                suggestedPrompts={suggestedPrompts}
                view={model.map.view}
            >
                <DataExplorationAgent />
                <HelpAgent />
                <NavigationAgent />
            </AssistantComponent>
        </LayoutElement>
    );
};

export default ArcGISAssistant;
