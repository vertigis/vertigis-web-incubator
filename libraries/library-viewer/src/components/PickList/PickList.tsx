import {
    LayoutElement,
    type LayoutElementProperties,
} from "@vertigis/web/components";
import { useWatchAndRerender } from "@vertigis/web/ui";
import ListItemButton from "@vertigis/web/ui/ListItemButton";
import MenuList from "@vertigis/web/ui/MenuList";
import Paper from "@vertigis/web/ui/Paper";
import Typography from "@vertigis/web/ui/Typography";
import type { FC } from "react";
import { useCallback } from "react";

import type PickListModel from "./PickListModel";
import type { Library } from "../LibraryViewer/LibraryViewerModel";

export interface PickListProps extends LayoutElementProperties<PickListModel> {}

const PickList: FC<PickListProps> = ({ model, title, ...layoutProps }) => {
    const { libraries, selectedLibrary } = model;
    useWatchAndRerender(model, "libraries");

    const onClick = useCallback(
        (library: Library) => {
            if (selectedLibrary !== library.id) {
                model.selectedLibrary = library.id;
                parent.location.hash = library.id;
            }
        },
        [model, selectedLibrary]
    );

    return (
        <LayoutElement {...layoutProps} stretch className="pick-list">
            <Paper>
                <Typography variant="h3">{title}</Typography>
                <MenuList>
                    {libraries?.map((library) => (
                        <ListItemButton
                            key={library.id}
                            selected={selectedLibrary.includes(library.id)}
                            onClick={() => onClick(library)}
                        >
                            <Typography variant="h4">
                                {library.title}
                            </Typography>
                        </ListItemButton>
                    ))}
                </MenuList>
            </Paper>
        </LayoutElement>
    );
};

export default PickList;
