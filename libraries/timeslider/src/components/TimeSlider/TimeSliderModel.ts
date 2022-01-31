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
import EsriTimeSlider from "@arcgis/core/widgets/TimeSlider";

interface TimeSliderModelProperties extends ComponentModelProperties {
    layout?: TimeSliderLayout;
    loop?: boolean;
    playRate?: number;
    mode?: TimeSliderMode;
    overrideStops?: boolean;
    timeInterval?: number;
    timeIntervalUnit?: TimeIntervalUnit;
    timeVisible?: boolean;
    inheritedWidgetConfig?: boolean;
}

@serializable
export default class TimeSliderModel extends ComponentModelBase<TimeSliderModelProperties> {
    @importModel(ItemType.MAP_EXTENSION)
    map: MapModel | undefined;
    widget: EsriTimeSlider;
    inheritedWidgetConfig: boolean;
    layout: TimeSliderLayout;
    loop: boolean;
    playRate: number;
    mode: TimeSliderMode;
    overrideStops: boolean;
    defaultStops:
        | __esri.StopsByCount
        | __esri.StopsByDates
        | __esri.StopsByInterval;
    timeInterval: number;
    timeIntervalUnit: TimeIntervalUnit;
    timeVisible: boolean;

    protected _getSerializableProperties(): PropertyDefs<TimeSliderModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            layout: {
                serializeModes: ["initial"],
                default: "compact",
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
            overrideStops: {
                serializeModes: ["initial"],
                default: false,
            },
            timeInterval: {
                serializeModes: ["initial"],
            },
            timeIntervalUnit: {
                serializeModes: ["initial"],
            },
            timeVisible: {
                serializeModes: ["initial"],
                default: false,
            },
            inheritedWidgetConfig: {
                serializeModes: ["initial"],
                default: false,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-timeslider-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "range-start",
            },
        };
    }
}
