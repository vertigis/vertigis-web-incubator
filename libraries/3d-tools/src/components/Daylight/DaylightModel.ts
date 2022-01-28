import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

interface DaylightModelProperties extends ComponentModelProperties {
    playButtons?: boolean;
    shadowsToggle?: boolean;
    datePicker?: boolean;
    timezone?: boolean;
}

@serializable
export default class DaylightModel extends ComponentModelBase<DaylightModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    playButtons: boolean;
    shadowsToggle: boolean;
    datePicker: boolean;
    timezone: boolean;

    protected _getSerializableProperties(): PropertyDefs<DaylightModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            playButtons: {
                serializeModes: ["initial"],
            },
            shadowsToggle: {
                serializeModes: ["initial"],
            },
            datePicker: {
                serializeModes: ["initial"],
            },
            timezone: {
                serializeModes: ["initial"],
                default: true,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-mapillary-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
