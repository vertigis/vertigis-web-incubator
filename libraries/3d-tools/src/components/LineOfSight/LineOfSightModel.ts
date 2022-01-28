import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type LineOfSightModelProperties = ComponentModelProperties;

@serializable
export default class LineOfSightModel extends ComponentModelBase<LineOfSightModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<LineOfSightModelProperties> {
        return super._getSerializableProperties();
    }
}
