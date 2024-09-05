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

interface ArcadeEditorModelProperties extends ComponentModelProperties {
    layerName?: string;
}

@serializable
export default class ArcadeEditorModel extends ComponentModelBase<ArcadeEditorModelProperties> {
    @importModel("map-extension")
    map: MapModel;

    layerName: string;
    featureLayer: __esri.FeatureLayer;

    constructor(props: ArcadeEditorModelProperties) {
        super(props);
        this.layerName = props.layerName;
    }

    async loadData(): Promise<{
        webMap: __esri.WebMap;
        featureLayer: __esri.FeatureLayer;
        featureSet: __esri.FeatureSet;
    }> {
        const featureSet = await this.featureLayer.queryFeatures({
            where: "1=1",
            outFields: ["*"],
            returnGeometry: true,
        });
        return {
            webMap: this.map.webMap as unknown as __esri.WebMap,
            featureLayer: this.featureLayer,
            featureSet,
        };
    }

    protected override async _onInitialize(): Promise<void> {
        const watchHandle = this.watch("map", () => {
            if (!this.map) {
                return undefined;
            }
            const extension = toLayerExtension(this.layerName, this.map);
            if (
                isLayerExtension(extension) &&
                (extension as FeatureLayerExtension).layer.type === "feature"
            ) {
                this.featureLayer = (extension as FeatureLayerExtension).layer;
            }
            watchHandle.remove();
        });
    }

    protected override _getSerializableProperties(): PropertyDefs<ComponentModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
        };
    }
}
