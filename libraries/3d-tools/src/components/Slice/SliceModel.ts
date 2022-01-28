import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type SliceModelProperties = ComponentModelProperties;

@serializable
export default class SliceModel extends ComponentModelBase<SliceModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<SliceModelProperties> {
        return super._getSerializableProperties();
    }
}
