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

type ElevationProfileModelProperties = ComponentModelProperties;

@serializable
export default class ElevationProfileModel extends ComponentModelBase<ElevationProfileModelProperties> {
    @importModel("map-extension")
    map: MapModel | undefined;

    @inject("region")
    regionService: RegionService | undefined;

    protected _getSerializableProperties(): PropertyDefs<ElevationProfileModelProperties> {
        return super._getSerializableProperties();
    }
}
