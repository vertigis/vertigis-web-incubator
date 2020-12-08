// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getViewer", { prevSubject: "optional" }, (subject) =>
    (
        (subject &&
            cy
                .wrap(subject, { log: false })
                .find('iframe[data-cy="viewer-frame"]', { log: false })) ||
        cy.get('iframe[data-cy="viewer-frame"]', { log: false })
    )
        .its("0.contentDocument.body", { log: false })
        .should("not.be.empty")
        .then((result) => cy.wrap(result, { log: false }))
);

Cypress.Commands.add("getViewerParent", () =>
    cy
        .get('iframe[data-cy="viewer-outer-frame"]', { log: false })
        .its("0.contentDocument.body", { log: false })
        .should("not.be.empty")
        .then((subject) => cy.wrap(subject, { log: false }))
);

Cypress.Commands.add("getNestedViewer", () => cy.getViewerParent().getViewer());

Cypress.Commands.add("getMap", { prevSubject: "element" }, (subject, id) => {
    const selector = id ? `[gcx-id="${id}"]` : ".gcx-map";

    return cy
        .wrap(subject, { log: false })
        .find(selector, { log: false, timeout: 30000 })
        .and((el) => {
            const mapId = el[0].getAttribute("gcx-id");
            const win = el[0].ownerDocument?.defaultView;
            const map = win.__maps?.[mapId] || win.__scenes?.[mapId];

            // Wait for global map data to be available once initialized
            expect(!!map, "expect map to be created").to.be.true;
            expect(map.ready, "expect map to be ready").to.be.true;
        });
});
