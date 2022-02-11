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
        const props = super._getSerializableProperties();
        return {
            ...props,
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-slice-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
