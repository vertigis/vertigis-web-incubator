const getIframeDocument = () => {
    return cy
        .get(`iframe[name="viewer"]`)
        .its("0.contentDocument")
        .should("exist");
};

const getIframeBody = () => {
    return getIframeDocument()
        .its("body")
        .should("not.be.undefined")
        .then(cy.wrap);
};

const getApplication = () => {
    return getIframeBody()
        .find("#gcx-app")
        .should("have.attr", "library-loaded")
        .then(cy.wrap);
};

const getMap = (id?: string) => {
    const selector = id ? `[gcx-id="${id}"]` : ".gcx-map";
    getApplication();
    return getIframeBody().find(selector).then(cy.wrap);
};

describe("sample-viewer", () => {
    it("loads the viewer frame", () => {
        cy.visit(`http://localhost:3001`);
        getIframeBody();
    });

    it("loads the viewer application", () => {
        cy.visit(`http://localhost:3001`);
        getApplication();
    });

    // This test works when run manually (npx cypress open) but fails when run
    // programatically :/
    xit("loads a map", () => {
        cy.visit(`http://localhost:3001`);
        getMap();
    });
});
