import type { LibraryRegistry } from "@vertigis/web/config";

import ChartWebComponent, {
    ChartWebComponentModel,
} from "./components/ChartWebComponent";

export default function registerLibrary(registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "chart-webcomponent",
        namespace: "vertigis.web.incubator.chart-webcomponent",
        getComponentType: () => ChartWebComponent,
        itemType: "chart-webcomponent",
        title: "language-web-incubator-chart-webcomponent-title",
    });
    registry.registerModel({
        getModel: (config) => new ChartWebComponentModel(config),
        itemType: "basic",
    });
}
