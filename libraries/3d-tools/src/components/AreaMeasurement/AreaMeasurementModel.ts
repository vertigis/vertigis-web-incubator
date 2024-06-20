import type { MapModel } from "@vertigis/web/mapping";
import type {
    PropertyDefs,
    ComponentModelProperties,
} from "@vertigis/web/models";
import {
    ComponentModelBase,
    serializable,
    importModel,
} from "@vertigis/web/models";

type AreaMeasurementModelProperties = ComponentModelProperties;

@serializable
export default class AreaMeasurementModel extends ComponentModelBase<AreaMeasurementModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    protected override _getSerializableProperties(): PropertyDefs<AreaMeasurementModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-area-measurement-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
