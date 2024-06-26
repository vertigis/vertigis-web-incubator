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

interface SliceModelProperties extends ComponentModelProperties {
    tiltEnabled?: boolean;
}

@serializable
export default class SliceModel extends ComponentModelBase<SliceModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    tiltEnabled?: boolean;

    protected override _getSerializableProperties(): PropertyDefs<SliceModelProperties> {
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
            tiltEnabled: {
                ...this._toPropertyDef(props.tiltEnabled),
                default: true,
            },
        };
    }
}
