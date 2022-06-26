const updatedWindowTitle = "🎉 This is a modified window title";
describe("Basic Window Tests", () => {
  it("Gets the default window", () => {
    cy.visit("/");
    cy.get("[data-cy='window-title-display-0'").should(
      "have.text",
      "Insert Title Here"
    );
  });
  it("Moves the default window", () => {
    cy.visit("/");
    cy.get("[data-cy='window-title-bar-0'").as("titleBar");
    cy.get("@titleBar")
      .trigger("mouseover")
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", {
        eventConstructor: "MouseEvent",
        clientX: 500,
        clientY: 100,
      })
      .trigger("mouseup", { which: 1 });

    cy.get("[data-cy='window-0']").should(
      "have.css",
      "transform",
      "matrix(1, 0, 0, 1, 220, 86)"
    );
  });
  it("Renames the default window", () => {
    cy.get("[data-cy='start-button']").as("startButton");
    cy.get("@startButton").click();
    cy.get("[data-cy='Edit Mode']").as("editModeButton");
    cy.get("@editModeButton").click();
    cy.get("[data-cy='window-title-edit-0'").type(updatedWindowTitle);

    cy.get("@startButton").click();
    cy.get("@editModeButton").click();
    cy.get("[data-cy='window-title-display-0'").should(
      "have.text",
      updatedWindowTitle
    );
    cy.get("[data-cy='tab-0']").should("have.text", updatedWindowTitle);
  });
  it("Tests window minimize/maximize/close functionality", () => {
    cy.get("[data-cy='maximize-button-0']").as("maximizeButton");
    cy.get("[data-cy='minimize-button-0']").as("minimizeButton");
    cy.get("[data-cy='close-button-0']").as("closeButton");

    cy.get("@maximizeButton").click();
    cy.get("[data-cy='window-0']").as("window");
    cy.get("@window").should("have.css", "width", "1000px");
    cy.get("@window").should("have.css", "height", "628px");
    cy.get("@maximizeButton").click();
    cy.get("@window").should("have.css", "width", "560px");

    cy.get("@minimizeButton").click();
    cy.get("@window").should("not.be.visible");
    cy.get("[data-cy='tab-0']").as("windowTab");
    cy.get("@windowTab").click();
    cy.get("@window").should("be.visible");

    cy.get("@closeButton").click();
    cy.get("@window").should("not.exist");
    cy.get("@windowTab").should("not.exist");
  });
});
