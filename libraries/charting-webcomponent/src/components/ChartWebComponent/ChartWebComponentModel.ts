import type {
    ComponentModelProperties,
    PropertyDefs,
} from "@vertigis/web/models";
import { ComponentModelBase, serializable } from "@vertigis/web/models";

interface ChartWebComponentModelProperties extends ComponentModelProperties {
    hidden?: boolean;
}

@serializable
export default class ChartWebComponentModel extends ComponentModelBase<ChartWebComponentModelProperties> {
    hidden: boolean | undefined;

    // This method defines how the model will be serialized and deserialized into
    // an app item. We override it to include our new property `hidden`.
    protected override _getSerializableProperties(): PropertyDefs<ChartWebComponentModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            hidden: {
                serializeModes: ["initial"],
                default: false,
            },
        };
    }
}
