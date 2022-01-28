import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type ElevationProfileModelProperties = ComponentModelProperties;

@serializable
export default class ElevationProfileModel extends ComponentModelBase<ElevationProfileModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<ElevationProfileModelProperties> {
        return super._getSerializableProperties();
    }
}
