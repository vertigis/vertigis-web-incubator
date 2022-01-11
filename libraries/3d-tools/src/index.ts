import { LibraryRegistry } from "@vertigis/web/config";
import AreaMeasurement3D from "./components/AreaMeasurement3D";

import invLanguage from "./locale/inv.json";

export default function (registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "area-measurement-3d",
        namespace: "vertigis.web.incubator",
        getComponentType: () => AreaMeasurement3D,

        itemType: "mapillary",
        title: "language-web-incubator-mapillary-title",
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
