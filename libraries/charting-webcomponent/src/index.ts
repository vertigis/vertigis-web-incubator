import type { LibraryRegistry } from "@vertigis/web/config";

import PieChart, { PieChartModel } from "./components/PieChart";

export default function registerLibrary(registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "piechart-webcomponent",
        namespace: "vertigis.web.incubator.charting",
        getComponentType: () => PieChart,
        itemType: "piechart-webcomponent-model",
        title: "language-web-incubator-piechart-webcomponent-title",
    });
    registry.registerModel({
        getModel: (config) => new PieChartModel(config),
        itemType: "piechart-webcomponent-model",
    });
}
