import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

type LineMeasurementModelProperties = ComponentModelProperties;

@serializable
export default class LineMeasurementModel extends ComponentModelBase<LineMeasurementModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected _getSerializableProperties(): PropertyDefs<LineMeasurementModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-line-measurement-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
