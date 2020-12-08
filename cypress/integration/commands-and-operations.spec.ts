const sampleName = "commands-and-operations";

const openIwtm = () =>
    cy.getViewer().contains("button", "Execute Custom Action").click();

const getMenuItem = (menuItemText: string) =>
    cy.getViewer().contains('[role="menuitem"]', menuItemText);

const clickMenuItem = (menuItemText: string) =>
    getMenuItem(menuItemText).click();

const enterPromptText = (text: string) =>
    cy
        .getViewer()
        .find('[role="dialog"]')
        .find("input")
        //  Had issues with cypress complaining about the input being disabled
        //  despite the disabled attribute not being present. Forcing works
        //  around this issue.
        .type(text, { force: true });

const clickDialogOkButton = () =>
    cy.getViewer().find('[role="dialog"]').contains("button", "OK").click();

describe(sampleName, () => {
    it("executes commands and operations", () => {
        cy.visit(`http://localhost:3000/${sampleName}`);

        // Send first message
        openIwtm();
        clickMenuItem("Send a message");
        enterPromptText("Never gonna give you up");
        clickDialogOkButton();

        // Send second message
        openIwtm();
        clickMenuItem("Send a message");
        enterPromptText("Never gonna let you down");
        clickDialogOkButton();

        // View message history
        openIwtm();
        clickMenuItem("View message history");
        cy.getViewer()
            .find('[role="alertdialog"]')
            .contains(
                `[ "Never gonna give you up", "Never gonna let you down" ]`
            )
            .should("be.visible");
        clickDialogOkButton();
    });

    it("has proper behavior for canExecute", () => {
        // Item should be disabled by default. Toggle to set it enabled.
        openIwtm();
        // Since it's just a `li` with a click handler, there isn't a `disabled`
        // attribute. If there were we could have used `should("be.disabled")`
        // instead.
        getMenuItem("Run command with canExecute").should(
            "have.attr",
            "aria-disabled",
            "true"
        );

        clickMenuItem("Toggle canExecute");

        // Item should be enabled
        openIwtm();
        getMenuItem("Run command with canExecute").should(
            "have.attr",
            "aria-disabled",
            "false"
        );

        // Click the item which should open a dialog
        clickMenuItem("Run command with canExecute");
        cy.getViewer()
            .find('[role="alertdialog"]')
            .contains(`It worked!`)
            .should("be.visible");
    });
});

export {};
