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
    dateOrSeason?: "date" | "season";
    playSpeedMultiplier?: number;
}

@serializable
export default class DaylightModel extends ComponentModelBase<DaylightModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    playButtons: boolean;
    shadowsToggle: boolean;
    datePicker: boolean;
    timezone: boolean;
    dateOrSeason: "date" | "season";
    playSpeedMultiplier: number;

    protected _getSerializableProperties(): PropertyDefs<DaylightModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            playButtons: {
                serializeModes: ["initial"],
                default: true,
            },
            shadowsToggle: {
                serializeModes: ["initial"],
                default: true,
            },
            datePicker: {
                serializeModes: ["initial"],
                default: true,
            },
            timezone: {
                serializeModes: ["initial"],
                default: true,
            },
            dateOrSeason: {
                serializeModes: ["initial"],
                default: "date",
            },
            playSpeedMultiplier: {
                serializeModes: ["initial"],
                default: 1,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-daylight-widget-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
