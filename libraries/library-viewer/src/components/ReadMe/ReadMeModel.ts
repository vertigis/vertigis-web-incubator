import { command } from "@vertigis/web/messaging";
import type { ComponentModelProperties } from "@vertigis/web/models";
import { ComponentModelBase, serializable } from "@vertigis/web/models";

@serializable
export default class ReadMeModel extends ComponentModelBase<ComponentModelProperties> {
    readme: string;

    @command("library-viewer.display-readme")
    protected async _executeDisplayReadMe(libraryId: string): Promise<void> {
        this.readme = (
            await import(
                /* webpackExclude: /node_modules/ */ `../../../../../libraries/${libraryId}/README.md`
            )
        )?.default;
    }
}
