import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";

interface ShadowCastModelProperties extends ComponentModelProperties {
    timeRangeSlider?: boolean;
    timezone?: boolean;
    datePicker?: boolean;
    visualizationOptions?: boolean;
    colorPicker?: boolean;
    tooltip?: boolean;
    visualizationType?: "threshold" | "duration" | "discrete";
}

@serializable
export default class ShadowCastModel extends ComponentModelBase<ShadowCastModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    timeRangeSlider?: boolean;
    timezone?: boolean;
    datePicker?: boolean;
    visualizationOptions?: boolean;
    colorPicker?: boolean;
    tooltip?: boolean;
    visualizationType?: "threshold" | "duration" | "discrete";

    protected _getSerializableProperties(): PropertyDefs<ShadowCastModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            timeRangeSlider: {
                serializeModes: ["initial"],
                default: true,
            },
            timezone: {
                serializeModes: ["initial"],
                default: true,
            },
            datePicker: {
                serializeModes: ["initial"],
                default: true,
            },
            visualizationOptions: {
                serializeModes: ["initial"],
                default: true,
            },
            colorPicker: {
                serializeModes: ["initial"],
                default: true,
            },
            visualizationType: {
                serializeModes: ["initial"],
                default: "threshold",
            },
            tooltip: {
                serializeModes: ["initial"],
                default: true,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-shadow-cast-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
