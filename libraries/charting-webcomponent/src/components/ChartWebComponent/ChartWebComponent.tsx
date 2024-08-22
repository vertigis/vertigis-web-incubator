import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import Button from "@vertigis/web/ui/Button";
import Typography from "@vertigis/web/ui/Typography";
import { useWatchAndRerender } from "@vertigis/web/ui/hooks";
import type { ReactElement } from "react";

import type BasicComponentModel from "./ChartWebComponentModel";
import "./ChartWebComponent.css";

const ChartWebComponent = (
    props: LayoutElementProperties<BasicComponentModel>
): ReactElement => {
    const { model } = props;

    // Watch for changes to the hidden property on the model
    useWatchAndRerender(model, "hidden");

    return (
        <LayoutElement {...props} className="ChartWebComponent">
            <Typography variant="h2" gutterBottom>
                I am a basic component
            </Typography>
            {/* Change the underlying model property value to trigger a re-render */}
            <Button
                data-test="BasicComponent-btn"
                onClick={() => (model.hidden = !model.hidden)}
            >
                {model.hidden ? "Show Me" : "Hide Me"}
            </Button>
            {!model.hidden && <Typography>BOO!</Typography>}
        </LayoutElement>
    );
};

export default ChartWebComponent;
