import {
    applyComponentModelDesignerSettings,
    ApplyDesignerSettingsCallback,
    ComponentModelDesignerSettings,
    DesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
    GetDesignerSettingsCallback,
    GetDesignerSettingsSchemaCallback,
    Setting,
    SettingsSchema,
} from "@vertigis/web/designer";

import MapillaryModel from "./MapillaryModel";

export interface MapillarySettings extends ComponentModelDesignerSettings {
    mapillaryKey: string;
    searchRadius: number;
    defaultScale: number;
    startSynced: boolean;
}

export type SettingsMap = DesignerSettings<MapillarySettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    MapillaryModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    MapillaryModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { mapillaryKey, searchRadius, defaultScale, startSynced } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        mapillaryKey,
        searchRadius,
        defaultScale,
        startSynced,
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    MapillaryModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<MapillarySettings>[]) = (
        baseSchema.settings[0].settings as Setting<MapillarySettings>[]
    ).concat([
        {
            id: "mapillaryKey",
            type: "text",
            description: "language-designer-mapillary-key-description",
            displayName: "language-designer-mapillary-key-title",
        },
        {
            id: "searchRadius",
            type: "number",
            description:
                "language-designer-mapillary-search-radius-description",
            displayName: "language-designer-mapillary-search-radius-title",
        },
        {
            id: "defaultScale",
            type: "number",
            description:
                "language-designer-mapillary-default-scale-description",
            displayName: "language-designer-mapillary-default-scale-title",
        },
        {
            id: "startSynced",
            type: "checkbox",
            description: "language-designer-mapillary-start-synced-description",
            displayName: "language-designer-mapillary-start-synced-title",
        },
    ]);
    const schema: SettingsSchema<MapillarySettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
