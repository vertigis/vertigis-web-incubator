const sampleName = "basic-component";

describe(sampleName, () => {
    it("controls model state using button", () => {
        cy.visit(`http://localhost:3000/${sampleName}`);

        cy.getViewer().find("button").contains("Show Me").click();
        cy.getViewer().contains("BOO!").should("be.visible");

        cy.getViewer().find("button").contains("Hide Me").click();
        cy.getViewer().contains("BOO!").should("not.be.visible");
    });
});

export {};
