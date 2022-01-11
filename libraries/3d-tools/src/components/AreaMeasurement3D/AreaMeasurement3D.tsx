import { ReactElement } from "react";
import {
    LayoutElement,
    LayoutElementProperties,
} from "@vertigis/web/components";
import AreaMeasurement3DModel from "./AreaMeasurement3DModel";

export default function AreaMeasurement3D(
    props: LayoutElementProperties<AreaMeasurement3DModel>
): ReactElement {
    return <LayoutElement {...props}></LayoutElement>;
}
