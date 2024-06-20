import { command } from "@vertigis/web/messaging";
import {
    ComponentModelBase,
    serializable,
    type ComponentModelProperties,
} from "@vertigis/web/models";

import type { Library } from "../LibraryViewer/LibraryViewerModel";

export interface SetLibraryArgs {
    libraries: Library[];
    selectedLibrary: string;
}

@serializable
export default class PickListModel extends ComponentModelBase<ComponentModelProperties> {
    libraries: Library[];
    selectedLibrary: string;

    @command("library-viewer.set-libraries")
    protected _executeSetLibraries({ libraries, selectedLibrary }): void {
        this.libraries = libraries;
        this.selectedLibrary = selectedLibrary;
    }
}
