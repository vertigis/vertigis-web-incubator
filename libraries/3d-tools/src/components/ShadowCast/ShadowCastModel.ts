import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type ShadowCastModelProperties = ComponentModelProperties;

@serializable
export default class ShadowCastModel extends ComponentModelBase<ShadowCastModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<ShadowCastModelProperties> {
        return super._getSerializableProperties();
    }
}
