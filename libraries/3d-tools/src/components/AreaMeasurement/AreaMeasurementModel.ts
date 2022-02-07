import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    PropertyDefs,
    ComponentModelProperties,
    importModel,
} from "@vertigis/web/models";
import { RegionService } from "@vertigis/web/region";
import { inject } from "@vertigis/web/services";

type AreaMeasurementModelProperties = ComponentModelProperties;

@serializable
export default class AreaMeasurementModel extends ComponentModelBase<AreaMeasurementModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    @inject("region")
    regionService: RegionService | undefined;

    protected _getSerializableProperties(): PropertyDefs<AreaMeasurementModelProperties> {
        return super._getSerializableProperties();
    }
}
