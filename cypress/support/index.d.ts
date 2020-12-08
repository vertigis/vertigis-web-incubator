declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Get the root element of the map component.
         * If no `id` is specified, it will return the first map.
         */
        getMap(id?: string): Chainable<JQuery<HTMLDivElement>>;
        /**
         * Get the `body` element from the viewer `iframe`.
         */
        getViewer(): Chainable<JQuery<HTMLBodyElement>>;
        /**
         * Get the `body` element from the parent `iframe` of the viewer.
         */
        getViewerParent(): Chainable<JQuery<HTMLBodyElement>>;
        /**
         * Get the `body` element from the viewer `iframe` when nested within a
         * parent iframe.
         */
        getNestedViewer(): Chainable<JQuery<HTMLBodyElement>>;
    }
}
