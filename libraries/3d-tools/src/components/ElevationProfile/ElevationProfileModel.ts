import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";
export interface ElevationProfileModelProperties
    extends ComponentModelProperties {
    legend?: boolean;
    chart?: boolean;
    clearButton?: boolean;
    settingsButton?: boolean;
    sketchButton?: boolean;
    selectButton?: boolean;
    uniformChartScalingToggle?: boolean;
    profileLineGround?: boolean;
    profileLineInput?: boolean;
    profileLineView?: boolean;
    profileLineGroundColor?: string;
    profileLineInputColor?: string;
    profileLineViewColor?: string;
}

@serializable
export default class ElevationProfileModel extends ComponentModelBase<ElevationProfileModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    legend: boolean;
    chart: boolean;
    clearButton: boolean;
    settingsButton: boolean;
    sketchButton: boolean;
    selectButton: boolean;
    uniformChartScalingToggle: boolean;
    profileLineGround: boolean;
    profileLineInput: boolean;
    profileLineView: boolean;
    profileLineGroundColor?: string;
    profileLineInputColor?: string;
    profileLineViewColor?: string;

    protected _getSerializableProperties(): PropertyDefs<ElevationProfileModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-elevation-profile-3d-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
            legend: {
                serializeModes: ["initial"],
                default: true,
            },
            chart: {
                serializeModes: ["initial"],
                default: true,
            },
            clearButton: {
                serializeModes: ["initial"],
                default: true,
            },
            settingsButton: {
                serializeModes: ["initial"],
                default: true,
            },
            sketchButton: {
                serializeModes: ["initial"],
                default: true,
            },
            selectButton: {
                serializeModes: ["initial"],
                default: true,
            },
            uniformChartScalingToggle: {
                serializeModes: ["initial"],
                default: true,
            },
            profileLineGround: {
                serializeModes: ["initial"],
                default: true,
            },
            profileLineInput: {
                serializeModes: ["initial"],
                default: true,
            },
            profileLineView: {
                serializeModes: ["initial"],
                default: true,
            },
            profileLineGroundColor: {
                serializeModes: ["initial"],
                default: "#ff7f00",
            },
            profileLineInputColor: {
                serializeModes: ["initial"],
                default: "#00c8c8",
            },
            profileLineViewColor: {
                serializeModes: ["initial"],
                default: "#cf4ccf",
            },
        };
    }
}
