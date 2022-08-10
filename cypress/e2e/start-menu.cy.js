import chaiColors from "chai-colors";
chai.use(chaiColors);
const blissImageUrl =
  "https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/bliss.jpg";

describe("Settings Tests", () => {
  it("Opens/closes menu and checks for correct menu items", () => {
    cy.visit("/");
    cy.get("[data-cy='start-button']").as("startButton");
    cy.get("@startButton").click();
    cy.get("[data-cy='settings-menu-item']").as("settingsMenuItem");
    cy.get("[data-cy='create-window-menu-item']").as("createWindowsMenuItem");
    cy.get("[data-cy='add-icon-menu-item']").as("addIconMenuItem");
    cy.get("[data-cy='edit-mode-menu-item']").as("editModeMenuItem");

    cy.get("@startButton").click();

    cy.get("@settingsMenuItem").should("not.exist");
    cy.get("@createWindowsMenuItem").should("not.exist");
    cy.get("@addIconMenuItem").should("not.exist");
    cy.get("@editModeMenuItem").should("not.exist");
  });

  it("Opens settings and checks for components", () => {
    cy.visit("/");
    cy.get("[data-cy='start-button']").as("startButton");
    cy.get("@startButton").click();
    cy.get("[data-cy='settings-menu-item']").click();

    // Checking settings tabs
    cy.get("[data-cy='setting-tab-0']");
    cy.get("[data-cy='setting-tab-1']");
    cy.get("[data-cy='setting-tab-2']");
  });

  it("Checks and uses features of appearance tab", () => {
    cy.visit("/");
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='settings-menu-item']").click();

    cy.get("[data-cy='remove-background-image-button']").click();
    cy.get("[data-cy='document-body']").as("documentBody");

    cy.get("@documentBody").should(
      "not.have.css",
      "background-image",
      `url("${blissImageUrl}")`
    );

    cy.get("[data-cy='background-color-input']").as("backgroundColorInput");
    cy.get("@backgroundColorInput").clear();
    cy.get("@backgroundColorInput").type("#da5d5d");
    cy.get("@documentBody")
      .should("have.css", "background-color")
      .and("be.colored", "#da5d5d");

    cy.get("[data-cy='set-background-image-button']").click();
    cy.get("@documentBody").should(
      "have.css",
      "background-image",
      `url("${blissImageUrl}")`
    );
  });

  it("Checks and uses features of miscellaneous tab", () => {
    cy.visit("/");
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='settings-menu-item']").click();
    cy.get("[data-cy='setting-tab-1']").click();
    cy.get("[data-cy='dragging-grid']").as("draggingGrid");
    cy.get("@draggingGrid").select("0px");
    cy.get("@draggingGrid").select("15px");
    cy.get("@draggingGrid").select("30px");
    cy.get("@draggingGrid").select("45px");
  });

  it("Checks and uses features of info tab", () => {
    cy.visit("/");
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='settings-menu-item']").click();
    cy.get("[data-cy='setting-tab-2']").click();
    cy.get("[data-cy='github-text']");
    cy.get("[data-cy='firefox-addon-text']");
    cy.get("[data-cy='chrome-addon-text']");
  });
});

describe("Create window test", () => {
  it("Creating new window", () => {
    cy.visit("/");

    cy.get("[data-cy='window-title-display-0'")
      .as("defaultWindow")
      .should("have.text", "Insert Title Here");

    cy.get("[data-cy='close-button-0']").click();
    cy.get("@defaultWindow").should("not.exist");
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='create-window-menu-item']").click();
    cy.get("@defaultWindow").should("have.text", "Insert Title Here");
  });
});
