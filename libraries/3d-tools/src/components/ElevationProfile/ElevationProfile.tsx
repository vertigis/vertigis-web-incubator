import { ReactElement, useEffect, useState } from "react";
import ElevationProfileWidget from "@arcgis/core/widgets/ElevationProfile";
import ElevationProfileLineGround from "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineGround";
import ElevationProfileLineInput from "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineInput";
import ElevationProfileLineView from "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineView";
import type Accessor from "@arcgis/core/core/Accessor";
import { useWatchAndRerender } from "@vertigis/web/ui";
import {
    createEsriMapWidget,
    MapWidgetProps,
} from "@vertigis/web/ui/esriUtils";
import ElevationProfileModel from "./ElevationProfileModel";

export type ElevationProfileWidgetProps = MapWidgetProps<
    ElevationProfileModel & Accessor
>;

const ElevationProfileWidgetWrapper = createEsriMapWidget<
    ElevationProfileModel & Accessor,
    ElevationProfileWidget
>(ElevationProfileWidget, true, true);

export default function ElevationProfile(
    props: ElevationProfileWidgetProps
): ReactElement {
    const { model } = props;
    const { map } = model;
    const [widget, setWidget] = useState<ElevationProfileWidget>();
    useWatchAndRerender(map, "map");
    useWatchAndRerender(model, [
        "title",
        "legend",
        "chart",
        "clearButton",
        "settingsButton",
        "sketchButton",
        "selectButton",
        "uniformChartScalingToggle",
        "profileLineGround",
        "profileLineInput",
        "profileLineView",
        "profileLineGroundColor",
        "profileLineInputColor",
        "profileLineViewColor",
    ]);
    useEffect(() => {
        if (!widget) {
            return;
        }
        widget.label = model.title;
        widget.visibleElements = {
            legend: model.legend,
            chart: model.chart,
            clearButton: model.clearButton,
            settingsButton: model.settingsButton,
            sketchButton: model.sketchButton,
            selectButton: model.selectButton,
            uniformChartScalingToggle: model.uniformChartScalingToggle,
        };
        widget.profiles.removeAll();
        if (model.profileLineGround) {
            widget.profiles.add(
                new ElevationProfileLineGround({
                    color: model.profileLineGroundColor,
                })
            );
        }
        if (model.profileLineInput) {
            widget.profiles.add(
                new ElevationProfileLineInput({
                    color: model.profileLineInputColor,
                })
            );
        }
        if (model.profileLineView) {
            widget.profiles.add(
                new ElevationProfileLineView({
                    color: model.profileLineViewColor,
                })
            );
        }
    }, [
        widget,
        model.title,
        model.profileLineGround,
        model.profileLineInput,
        model.profileLineView,
        model.legend,
        model.chart,
        model.clearButton,
        model.settingsButton,
        model.sketchButton,
        model.selectButton,
        model.uniformChartScalingToggle,
        model.profileLineGroundColor,
        model.profileLineInputColor,
        model.profileLineViewColor,
    ]);

    if (map.viewMode === "map") {
        return null;
    }

    return (
        <ElevationProfileWidgetWrapper
            onWidgetCreated={setWidget}
            {...props}
        ></ElevationProfileWidgetWrapper>
    );
}
