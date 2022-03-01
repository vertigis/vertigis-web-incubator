import { LibraryRegistry } from "@vertigis/web/config";

import invLanguage from "./locale/inv.json";

const getAreaMeasurement = () => import("./components/AreaMeasurement");
const getDaylight = () => import("./components/Daylight");
const getElevationProfile = () => import("./components/ElevationProfile");
const getLineOfSight = () => import("./components/LineOfSight");
const getSlice = () => import("./components/Slice");
const getShadowCast = () => import("./components/ShadowCast");

export default function (registry: LibraryRegistry): void {
    registry.registerModel({
        getModel: async (config) =>
            new (await getAreaMeasurement()).AreaMeasurementModel(config),
        itemType: "area-measurement-3d",
    });
    registry.registerModel({
        getModel: async (config) =>
            new (await getLineOfSight()).LineOfSightModel(config),
        itemType: "line-of-sight-3d",
    });
    registry.registerModel({
        getModel: async (config) =>
            new (await getDaylight()).DaylightModel(config),
        itemType: "daylight-widget-3d",
    });
    registry.registerModel({
        getModel: async (config) =>
            new (await getElevationProfile()).ElevationProfileModel(config),
        itemType: "elevation-profile-3d",
    });
    registry.registerModel({
        getModel: async (config) =>
            new (await getShadowCast()).ShadowCastModel(config),
        itemType: "shadow-cast-3d",
    });
    registry.registerModel({
        getModel: async (config) => new (await getSlice()).SliceModel(config),
        itemType: "slice-3d",
    });

    registry.registerComponent({
        name: "area-measurement-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getAreaMeasurement()).default,
        category: "map",
        itemType: "area-measurement-3d",
        title: "language-web-incubator-area-measurement-3d-title",
        description: "language-web-incubator-area-measurement-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "line-of-sight-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getLineOfSight()).default,
        category: "map",
        itemType: "line-of-sight-3d",
        title: "language-web-incubator-line-of-sight-3d-title",
        description: "language-web-incubator-line-of-sight-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "daylight-widget-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getDaylight()).default,
        getDesignerSettings: async (args) =>
            (await getDaylight()).getSettings(args),
        applyDesignerSettings: async (args) =>
            (await getDaylight()).applySettings(args),
        getDesignerSettingsSchema: async (args) =>
            (await getDaylight()).getSettingsSchema(args),
        category: "map",
        itemType: "daylight-widget-3d",
        title: "language-web-incubator-daylight-widget-3d-title",
        description: "language-web-incubator-daylight-widget-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "elevation-profile-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getElevationProfile()).default,
        getDesignerSettings: async (args) =>
            (await getElevationProfile()).getSettings(args),
        applyDesignerSettings: async (args) =>
            (await getElevationProfile()).applySettings(args),
        getDesignerSettingsSchema: async (args) =>
            (await getElevationProfile()).getSettingsSchema(args),
        category: "map",
        itemType: "elevation-profile-3d",
        title: "language-web-incubator-elevation-profile-3d-title",
        description: "language-web-incubator-elevation-profile-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "shadow-cast-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getShadowCast()).default,
        getDesignerSettings: async (args) =>
            (await getShadowCast()).getSettings(args),
        applyDesignerSettings: async (args) =>
            (await getShadowCast()).applySettings(args),
        getDesignerSettingsSchema: async (args) =>
            (await getShadowCast()).getSettingsSchema(args),
        category: "map",
        itemType: "shadow-cast-3d",
        title: "language-web-incubator-shadow-cast-3d-title",
        description: "language-web-incubator-shadow-cast-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "slice-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: async () => (await getSlice()).default,
        category: "map",
        itemType: "slice-3d",
        title: "language-web-incubator-slice-3d-title",
        description: "language-web-incubator-slice-3d-description",
        iconId: "map-3rd-party",
    });

    registry.registerLanguageResources({
        locale: "inv",
        values: invLanguage as { [key: string]: string },
    });
    registry.registerLanguageResources({
        locale: "en",
        values: invLanguage as { [key: string]: string },
    });
}
