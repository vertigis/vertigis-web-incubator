import { LibraryRegistry } from "@vertigis/web/config";
import AreaMeasurement3D, {
    AreaMeasurement3DModel,
} from "./components/AreaMeasurement3D";

import invLanguage from "./locale/inv.json";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "area-measurement-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: () => AreaMeasurement3D,

        itemType: "area-measurement-3d",
        title: "language-web-incubator-area-measurement-3d-title",
        iconId: "map-3rd-party",
    });
    registry.registerModel({
        getModel: (config) => new AreaMeasurement3DModel(config),
        itemType: "area-measurement-3d",
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
