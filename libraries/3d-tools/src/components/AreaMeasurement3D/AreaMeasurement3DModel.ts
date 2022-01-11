import {
    ComponentModelBase,
    serializable,
    ComponentModelProperties,
} from "@vertigis/web/models";

interface AreaMeasurement3DProperties extends ComponentModelProperties {
    //
}

@serializable
export default class AreaMeasurement3DModel extends ComponentModelBase<AreaMeasurement3DProperties> {}
