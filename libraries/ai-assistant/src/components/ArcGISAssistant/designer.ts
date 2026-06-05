import {
    applyComponentModelDesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
    type GetDesignerSettingsCallback,
    type GetDesignerSettingsSchemaCallback,
    type SettingsSchema,
    type ApplyDesignerSettingsCallback,
    type ComponentModelDesignerSettings,
    type DesignerSettings,
    type Setting,
    type ListItemSettings,
} from "@vertigis/web/designer";

import type ArcGISAssistantModel from "./ArcGISAssistantModel";

interface SuggestedPromptSettings {
    suggestedPrompt: string;
}

interface ArcGISAssistantSettings extends ComponentModelDesignerSettings {
    description: string;
    entryMessage: string;
    heading: string;
    suggestedPrompts: ListItemSettings<SuggestedPromptSettings>[];
}

export const applySettings: ApplyDesignerSettingsCallback<
    ArcGISAssistantModel,
    DesignerSettings<ArcGISAssistantSettings>
> = async args => {
    const { model, settings } = args;

    await applyComponentModelDesignerSettings(args);
    const { suggestedPrompts, ...properties } = settings as ArcGISAssistantSettings;

    if (suggestedPrompts) {
        model.suggestedPrompts = suggestedPrompts.map(item => item.data?.suggestedPrompt);
    }

    model.assignProperties(properties);
};

export const getSettings: GetDesignerSettingsCallback<
    ArcGISAssistantModel,
    DesignerSettings<ArcGISAssistantSettings>
> = async args => {
    const { model } = args;
    const { description, entryMessage, heading, suggestedPrompts } = model;

    return {
        ...(await getComponentModelDesignerSettings(args)),
        description,
        entryMessage,
        heading,
        suggestedPrompts: suggestedPrompts.map((prompt, index) => ({
            id: index.toString(),
            itemTypeId: "suggested-prompt",
            data: { suggestedPrompt: prompt },
            title: prompt,
        })),
    };
};

type SettingsMap = DesignerSettings<ArcGISAssistantSettings> &
    DesignerSettings<SuggestedPromptSettings, "suggested-prompt">;

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<ArcGISAssistantModel, SettingsMap> = async args => {
    if (args.subsettingsType === "suggested-prompt") {
        return {
            settings: [
                {
                    id: "suggestedPrompt",
                    type: "text",
                    displayName: "language-designer-ai-assistant-suggested-prompt-title",
                    isRequired: true,
                },
            ],
        };
    }

    const baseSchema = await getComponentModelDesignerSettingsSchema(args);

    (baseSchema.settings[0].settings as Setting<ArcGISAssistantSettings>[]) = (
        baseSchema.settings[0].settings as Setting<ArcGISAssistantSettings>[]
    ).concat([
        {
            id: "description",
            type: "text",
            description: "language-designer-ai-assistant-description-description",
            displayName: "language-designer-ai-assistant-description-title",
        },
        {
            id: "entryMessage",
            type: "text",
            description: "language-designer-ai-assistant-entry-message-description",
            displayName: "language-designer-ai-assistant-entry-message-title",
        },
        {
            id: "heading",
            type: "text",
            description: "language-designer-ai-assistant-heading-description",
            displayName: "language-designer-ai-assistant-heading-title",
        },
        {
            id: "suggestedPrompts",
            type: "list",
            itemTypes: [
                {
                    subsettingsType: "suggested-prompt",
                    addItemTitle: "language-designer-ai-assistant-suggested-prompt",
                },
            ],
            sortable: true,
            inPlace: true,
            description: "language-designer-ai-assistant-suggested-prompts-description",
            displayName: "language-designer-ai-assistant-suggested-prompts-title",
        },
    ]);

    const schema: SettingsSchema<ArcGISAssistantSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
