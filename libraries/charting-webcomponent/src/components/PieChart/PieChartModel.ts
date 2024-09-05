import { isLayerExtension } from "@vertigis/arcgis-extensions/ItemType";
import type { FeatureLayerExtension } from "@vertigis/arcgis-extensions/mapping/FeatureLayerExtension";
import type { MapModel } from "@vertigis/web/mapping/MapModel";
import { toLayerExtension } from "@vertigis/web/messaging/mapConversion";
import type {
    ComponentModelProperties,
    PropertyDefs,
} from "@vertigis/web/models";
import {
    ComponentModelBase,
    importModel,
    serializable,
} from "@vertigis/web/models";

interface PieChartModelProperties extends ComponentModelProperties {
    layer?: string;
}

@serializable
export default class PieChartModel extends ComponentModelBase<PieChartModelProperties> {
    @importModel("map-extension")
    map: MapModel;
    layerId: string;
    layer: __esri.FeatureLayer;

    constructor(props: PieChartModelProperties) {
        super(props);
        this.layerId = props.layer;
    }

    protected override async _onInitialize(): Promise<void> {
        const watchHandle = this.watch("map", () => {
            if (!this.map) {
                return undefined;
            }
            const extension = toLayerExtension(this.layerId, this.map);
            if (
                isLayerExtension(extension) &&
                (extension as FeatureLayerExtension).layer.type === "feature"
            ) {
                this.layer = (extension as FeatureLayerExtension).layer;
            }
            watchHandle.remove();
        });
    }

    protected override _getSerializableProperties(): PropertyDefs<PieChartModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
        };
    }
}
