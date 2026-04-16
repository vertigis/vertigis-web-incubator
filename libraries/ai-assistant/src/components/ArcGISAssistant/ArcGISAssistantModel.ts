import type { MapModel } from "@vertigis/web/mapping/MapModel";
import { command } from "@vertigis/web/messaging";
import type { ComponentModelProperties, PropertyDefs } from "@vertigis/web/models";
import { ComponentModelBase, importModel, serializable } from "@vertigis/web/models";
import React from "react";

import { ArcGISAssistantElement, ArcGISAssistantProps } from "./ArcGISAssistant";

export interface ArcGISAssistantModelProperties extends ArcGISAssistantProps, ComponentModelProperties {}

@serializable
export default class ArcGISAssistantModel extends ComponentModelBase<ArcGISAssistantModelProperties> {
    @importModel("map-extension")
    map: MapModel;

    componentRef: React.MutableRefObject<ArcGISAssistantElement>;

    copyEnabled?: boolean;
    description?: string;
    entryMessage?: string;
    feedbackEnabled?: boolean;
    heading?: string;
    keepSuggestedPrompts?: boolean;
    logEnabled?: boolean;
    suggestedPrompts?: string[];

    // Expose component methods as Web commands.
    @command("arcgis-assistant.clear-chat-history")
    protected async _executeClearChatHistory(): Promise<void> {
        return this.componentRef?.current?.clearChatHistory();
    }

    @command("arcgis-assistant.submit-message")
    protected async _executeSubmitMessage(message: string): Promise<void> {
        return this.componentRef?.current?.submitMessage(message);
    }

    protected override _getSerializableProperties(): PropertyDefs<ArcGISAssistantModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            copyEnabled: {
                serializeModes: ["initial"],
                default: true,
            },
            description: {
                serializeModes: ["initial"],
                default: "Explore map data.",
            },
            entryMessage: {
                serializeModes: ["initial"],
                default: "I can answer questions about the data presented in this map.",
            },
            feedbackEnabled: {
                serializeModes: ["initial"],
                default: true,
            },
            heading: {
                serializeModes: ["initial"],
                default: "AI Assistant",
            },
            keepSuggestedPrompts: {
                serializeModes: ["initial"],
                default: false,
            },
            logEnabled: {
                serializeModes: ["initial"],
                default: true,
            },
            suggestedPrompts: {
                serializeModes: ["initial"],
                default: [],
            },
        };
    }
}
