import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type AreaMeasurementModelProperties = ComponentModelProperties;

@serializable
export default class AreaMeasurementModel extends ComponentModelBase<AreaMeasurementModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<AreaMeasurementModelProperties> {
        return super._getSerializableProperties();
    }
}
