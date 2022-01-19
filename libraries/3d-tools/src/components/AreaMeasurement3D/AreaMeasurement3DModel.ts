import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type AreaMeasurement3DModelProperties = ComponentModelProperties;

@serializable
export default class AreaMeasurement3DModel extends ComponentModelBase<AreaMeasurement3DModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<AreaMeasurement3DModelProperties> {
        return super._getSerializableProperties();
    }
}
