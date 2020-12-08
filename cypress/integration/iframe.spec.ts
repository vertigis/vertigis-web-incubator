import { expectMapToBeStationary, getCurrentViewpoint } from "../mapUtils";

const sampleName = "iframe";

describe(sampleName, () => {
    it("sends message from parent to viewer", () => {
        cy.visit(`http://localhost:3000/${sampleName}`);

        cy.getNestedViewer()
            .getMap()
            .should((map) => {
                expectMapToBeStationary(map);
                const viewpoint = getCurrentViewpoint(map);
                expect(viewpoint.camera.position.z).not.to.equal(-250);
            });

        cy.getViewerParent().contains("button", "Go!").click();

        cy.getNestedViewer()
            .getMap()
            .should((map) => {
                expectMapToBeStationary(map);
                const viewpoint = getCurrentViewpoint(map);
                expect(viewpoint.camera.position.z).to.equal(-250);
            });

        cy.getViewerParent()
            .contains("button", "Zoom to initial viewpoint")
            .click();

        cy.getNestedViewer()
            .getMap()
            .should((map) => {
                expectMapToBeStationary(map);
                const viewpoint = getCurrentViewpoint(map);
                expect(viewpoint.camera.position.z).not.to.equal(-250);
            });
    });

    it("sends message from viewer to parent", () => {
        cy.visit(`http://localhost:3000/${sampleName}`);

        cy.getNestedViewer()
            .contains("button", "Send message to parent")
            .click();

        cy.getNestedViewer()
            .contains('[role="dialog"]', "Enter the message")
            .find("input")
            .type("Hello world");

        cy.getNestedViewer()
            .contains('[role="dialog"]', "Enter the message")
            .contains("button", "OK")
            .click();

        cy.getViewerParent().contains("Hello world");
    });
});
