import {
    applyComponentModelDesignerSettings,
    type ApplyDesignerSettingsCallback,
    type ComponentModelDesignerSettings,
    type DesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
    type GetDesignerSettingsCallback,
    type GetDesignerSettingsSchemaCallback,
    type SettingsSchema,
} from "@vertigis/web/designer";

import type EagleViewModel from "./EagleViewModel";

export interface EagleViewSettings extends ComponentModelDesignerSettings {
    apiKey: string;
}

export type SettingsMap = DesignerSettings<EagleViewSettings>;

export const applyEVSettings: ApplyDesignerSettingsCallback<
    EagleViewModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;

    await applyComponentModelDesignerSettings(args);

    model.assignProperties(settings);
};

export const getEVSettings: GetDesignerSettingsCallback<
    EagleViewModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { apiKey } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        apiKey,
    };
};

export const getPictSettingsSchema: GetDesignerSettingsSchemaCallback<
    EagleViewModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    const schema: SettingsSchema<EagleViewSettings> = {
        ...baseSchema,
        settings: [
            ...baseSchema.settings,
            {
                id: "apiKey",
                type: "text",
                description: "language-designer-eagleview-api-key-description",
                displayName: "language-designer-eagleview-api-key-title",
            },
        ],
    };
    return schema;
};
