import {
    LayoutElement,
    type LayoutElementProperties,
} from "@vertigis/web/components";
import LayoutElementContainer from "@vertigis/web/components/LayoutElementContainer";
import { useWatchAndRerender } from "@vertigis/web/ui";
import Link from "@vertigis/web/ui/Link";
import Stack from "@vertigis/web/ui/Stack";
import type { FC } from "react";

import type LibraryViewerModel from "./LibraryViewerModel";
import "./LibraryViewer.css";

export interface LibraryViewerProps
    extends LayoutElementProperties<LibraryViewerModel> {}

const LibraryViewer: FC<LibraryViewerProps> = ({
    model,
    children,
    ...layoutProps
}) => {
    const { selectedLibrary, libraryUrl } = model;
    useWatchAndRerender(model, "libraryUrl");

    return (
        <LayoutElement {...layoutProps} stretch className="library-viewer">
            <Stack sx={{ margin: 2 }}>
                <LayoutElementContainer sx={{ border: "1px solid lightgrey" }}>
                    {children}
                </LayoutElementContainer>
                <Link
                    href={`https://github.com/vertigis/vertigis-web-incubator/tree/main/libraries/${selectedLibrary}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View the source code on GitHub
                </Link>
                <Link href={libraryUrl} download={`${selectedLibrary}.js`}>
                    Download this library
                </Link>
            </Stack>
        </LayoutElement>
    );
};

export default LibraryViewer;
