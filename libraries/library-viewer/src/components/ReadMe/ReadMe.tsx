/* eslint-disable react/display-name */
import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Markdown from "@vertigis/web/ui/Markdown";
import type { FC } from "react";
import { useEffect, useState } from "react";

import type ReadMeModel from "./ReadMeModel";

export interface ReadMeProps extends LayoutElementProperties<ReadMeModel> {}

const ReadMe: FC<ReadMeProps> = ({ model, ...layoutProps }) => {
    const [readmeText, setReadmeText] = useState<string>();
    useWatchAndRerender(model, "readme");

    useEffect(() => {
        setReadmeText(model.readme);
    }, [model.readme]);

    return (
        <LayoutElement stretch {...layoutProps}>
            {readmeText && (
                <Markdown
                    text={readmeText}
                    sx={{ marginLeft: 4, marginRight: 4 }}
                />
            )}
        </LayoutElement>
    );
};

export default ReadMe;
