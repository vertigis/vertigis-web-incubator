import {
    ComponentModelBase,
    ComponentModelProperties,
    importModel,
    PropertyDefs,
    serializable,
} from "@vertigis/web/models";
import { ItemType } from "@vertigis/arcgis-extensions/ItemType";
import { TimeIntervalUnit, TimeSliderLayout, TimeSliderMode } from "./designer";
import { MapModel } from "@vertigis/web/mapping/MapModel";

interface TimeSliderModelProperties extends ComponentModelProperties {
    layout?: TimeSliderLayout;
    loop?: boolean;
    playRate?: number;
    mode?: TimeSliderMode;
    timeInterval?: number;
    timeIntervalUnit?: TimeIntervalUnit;
    timeVisible?: boolean;
}

@serializable
export default class TimeSliderModel extends ComponentModelBase<TimeSliderModelProperties> {
    @importModel(ItemType.MAP_EXTENSION)
    map: MapModel | undefined;
    layout: TimeSliderLayout;
    loop: boolean;
    playRate: number;
    mode: TimeSliderMode;
    timeInterval: number;
    timeIntervalUnit: TimeIntervalUnit;
    timeVisible: boolean;

    protected _getSerializableProperties(): PropertyDefs<TimeSliderModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            layout: {
                serializeModes: ["initial"],
                default: "auto",
            },
            loop: {
                serializeModes: ["initial"],
                default: true,
            },
            playRate: {
                serializeModes: ["initial"],
                default: 1000,
            },
            mode: {
                serializeModes: ["initial"],
                default: "time-window",
            },
            timeInterval: {
                serializeModes: ["initial"],
                default: 1,
            },
            timeIntervalUnit: {
                serializeModes: ["initial"],
                default: "milliseconds",
            },
            timeVisible: {
                serializeModes: ["initial"],
                default: false,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-mapillary-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "range-start",
            },
        };
    }
}
