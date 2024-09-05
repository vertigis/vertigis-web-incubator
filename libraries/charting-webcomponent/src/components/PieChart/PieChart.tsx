import {
    ArcgisChartsActionBar,
    ArcgisChartsPieChart,
} from "@arcgis/charts-components-react";
import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import { useAsyncEffect } from "@vertigis/web/ui";
import { useRef, useCallback, type ReactElement } from "react";

import type PieChartModel from "./PieChartModel";

import jsonPieChart from "./piechart.json";

import "./PieChart.css";

const PieChart = (
    props: LayoutElementProperties<PieChartModel>
): ReactElement => {
    const {
        model: { layer, map },
    } = props;

    const pieChartRef = useRef<HTMLArcgisChartsPieChartElement>();
    const actionBarRef = useRef<HTMLArcgisChartsActionBarElement>();

    // Using a callback ref allows us to be sure we only attach the event handler once.
    const onPieChartRefChange = useCallback(
        (pieChartElement: HTMLArcgisChartsPieChartElement) => {
            if (!pieChartElement) {
                return undefined;
            }
            pieChartElement.addEventListener(
                "arcgisChartsSelectionComplete",
                (event: CustomEvent) => {
                    if (!actionBarRef.current) {
                        return undefined;
                    }
                    const selectionData = event.detail;
                    if (
                        !selectionData.selectionOIDs === undefined ||
                        selectionData.selectionOIDs.length === 0
                    ) {
                        actionBarRef.current.clearSelectionState = "disabled";
                        actionBarRef.current.filterBySelectionState =
                            "disabled";
                    } else {
                        actionBarRef.current.clearSelectionState = "enabled";
                        actionBarRef.current.filterBySelectionState = "enabled";
                    }
                }
            );
            pieChartRef.current = pieChartElement;
        },
        []
    );

    useAsyncEffect(async () => {
        if (!layer) {
            return undefined;
        }

        console.log(map.webMap);

        pieChartRef.current.config = jsonPieChart;
        pieChartRef.current.layer = layer;
    }, [layer]);

    return (
        <LayoutElement
            {...props}
            stretch
            height={40}
            width={80}
            className="piechart-webcomponent"
        >
            <ArcgisChartsPieChart ref={onPieChartRefChange}>
                <ArcgisChartsActionBar slot="action-bar" ref={actionBarRef} />
            </ArcgisChartsPieChart>
        </LayoutElement>
    );
};

export default PieChart;
