import type Accessor from "@arcgis/core/core/Accessor";
import DaylightWidget from "@arcgis/core/widgets/Daylight";
import { useWatchAndRerender, styled } from "@vertigis/web/ui";
import { createEsriMapWidget } from "@vertigis/web/ui/esriUtils";
import type {
    MapWidgetConstructor,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import type DaylightModel from "./DaylightModel";

export type DaylightWidgetProps = MapWidgetProps<DaylightModel & Accessor>;

const DaylightWidgetWrapper = createEsriMapWidget(
    DaylightWidget as MapWidgetConstructor<DaylightWidget>,
    true,
    true
);

const StyledDaylightWrapper = styled(DaylightWidgetWrapper)({
    "--calcite-ui-text-1": "var(--primaryForeground)",
    "& .esri-widget": {
        width: "100%",
    },
});

export default function Daylight(props: DaylightWidgetProps): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<DaylightWidget>();

    useWatchAndRerender(map, ["map", "viewMode"]);
    useWatchAndRerender(model, [
        "title",
        "datePicker",
        "playButtons",
        "shadowsToggle",
        "timezone",
        "dateOrSeason",
        "playSpeedMultiplier",
    ]);
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.visibleElements = {
            datePicker: model.datePicker,
            playButtons: model.playButtons,
            shadowsToggle: model.shadowsToggle,
            timezone: model.timezone,
        };
        widget.label = model.title;
        widget.dateOrSeason = model.dateOrSeason;
        widget.playSpeedMultiplier = model.playSpeedMultiplier;
    }, [
        widget,
        model,
        model.title,
        model.datePicker,
        model.playButtons,
        model.shadowsToggle,
        model.timezone,
        model.dateOrSeason,
        model.playSpeedMultiplier,
    ]);

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <StyledDaylightWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></StyledDaylightWrapper>
    );
}
