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
    return getIframeBody()
        .find(selector)
        .and((el) => {
            const mapId = el[0].getAttribute("data-layout-id");
            const win = el[0].ownerDocument?.defaultView as Window & any;
            const map = win.__maps?.[mapId!] || win.__scenes?.[mapId!];

            // Wait for global map data to be available once initialized
            expect(!!map, "expect map to be created").to.be.true;
            expect(map.ready, "expect map to be ready").to.be.true;
        })
        .then(cy.wrap);
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

    it("loads the correct sample", () => {
        cy.visit(`http://localhost:3001/#timeslider`);
        getIframeBody()
            .find(".gcx-readme")
            .should("contain.text", "Time Slider");
    });

    it("loads a map", () => {
        cy.visit(`http://localhost:3001/#timeslider`);
        getMap();
    });
});
