import { LibraryRegistry } from "@vertigis/web/config";
import AreaMeasurement3D, {
    AreaMeasurementModel,
} from "./components/AreaMeasurement";
import Daylight, { DaylightModel } from "./components/Daylight";
import ElevationProfile, {
    ElevationProfileModel,
} from "./components/ElevationProfile";
import Slice, { SliceModel } from "./components/Slice";

import invLanguage from "./locale/inv.json";

const getLineOfSight = () => import("./components/LineOfSight");
const getDaylight = () => import("./components/Daylight");

export default function (registry: LibraryRegistry): void {
    registry.registerModel({
        getModel: (config) => new AreaMeasurementModel(config),
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
        getModel: (config) => new ElevationProfileModel(config),
        itemType: "elevation-profile-3d",
    });
    registry.registerModel({
        getModel: (config) => new ElevationProfileModel(config),
        itemType: "shadow-cast-3d",
    });
    registry.registerModel({
        getModel: (config) => new SliceModel(config),
        itemType: "slice-3d",
    });

    registry.registerComponent({
        name: "area-measurement-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: () => AreaMeasurement3D,
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
        getComponentType: () => ElevationProfile,
        category: "map",
        itemType: "elevation-profile-3d",
        title: "language-web-incubator-elevation-profile-3d-title",
        description: "language-web-incubator-elevation-profile-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "shadow-cast-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: () => ElevationProfile,
        category: "map",
        itemType: "shadow-cast-3d",
        title: "language-web-incubator-shadow-cast-3d-title",
        description: "language-web-incubator-shadow-cast-3d-description",
        iconId: "map-3rd-party",
    });
    registry.registerComponent({
        name: "slice-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: () => Slice,
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
