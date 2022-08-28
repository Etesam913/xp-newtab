const updatedWindowTitle = "🎉 This is a modified window title";
const blissImageUrl =
  "https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/bliss.jpg";

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
      "matrix(1, 0, 0, 1, 260, 86)"
    );
  });
  it("Renames the default window", () => {
    cy.get("[data-cy='start-button']").as("startButton").click();
    cy.get("[data-cy='edit-mode-menu-item']").as("editModeButton");
    cy.get("@editModeButton").click();
    cy.get("[data-cy='window-title-edit-0'").clear().type(updatedWindowTitle);

    cy.get("@startButton").click();
    cy.get("@editModeButton").click();
    cy.get("[data-cy='window-title-display-0'").should(
      "have.text",
      updatedWindowTitle
    );
    cy.get("[data-cy='tab-0']").should("have.text", updatedWindowTitle);
    cy.get("@editModeButton").click();
  });

  it("Tests window minimize/maximize/close functionality", () => {
    cy.get("[data-cy='maximize-button-0']").as("maximizeButton");
    cy.get("[data-cy='minimize-button-0']").as("minimizeButton");
    cy.get("[data-cy='close-button-0']").as("closeButton");

    cy.get("@maximizeButton").click();
    cy.get("[data-cy='window-0']").as("window");
    cy.get("@window").should("have.css", "width", "1000px");
    cy.get("@window").should("have.css", "height", "628px");

    cy.get("body").then(($body) => {
      const bannerButton = $body.find("button[data-cy=close-banner-button]");
      if (bannerButton.length > 0) {
        bannerButton.click();
        //evaluates as true
      }
    });

    cy.get("@maximizeButton").click();
    cy.get("@window").should("have.css", "width", "480px");

    cy.get("@minimizeButton").click();
    cy.get("@window").should("not.be.visible");
    cy.get("[data-cy='tab-0']").as("windowTab");
    cy.get("@windowTab").click();
    cy.get("@window").should("be.visible");

    cy.get("@closeButton").click();
    cy.get("@window").should("not.exist");
    cy.get("@windowTab").should("not.exist");
  });

  it("Creates a window", () => {
    cy.get("[data-cy='start-button']").as("startButton").click();
    cy.get("[data-cy='create-window-menu-item']").click();
  });
});
describe("Image Tests", () => {
  it("Creates an image", () => {
    cy.get("[data-cy='image-option-0']").click();
    cy.get("[data-cy='add-component-button-0']").click();
    cy.get("[data-cy='align-image-1']");
    cy.get("[data-cy='image-delete-1']");
    cy.get("[data-cy='set-image-url-1']");
    cy.get("[data-cy='image-size-slider-1']");
  });

  it("Changes align property of image", () => {
    cy.get("[data-cy='align-image-1']").as("imageAlign");
    cy.get("[data-cy='image-1']");
    cy.get("[data-cy='image-container-1']")
      .as("imageContainer")
      .should("have.css", "justifyContent", "flex-start");
    cy.get("@imageAlign").select("center");
    cy.get("@imageContainer").should("have.css", "justifyContent", "center");
    cy.get("@imageAlign").select("right");
    cy.get("@imageContainer").should("have.css", "justifyContent", "flex-end");
  });

  it("Changes Image Url", () => {
    cy.get("[data-cy='set-image-url-1']").click();
    cy.get("[data-cy='image-url-input-1']")
      .as("imageUrlInput")
      .clear()
      .type(blissImageUrl);
    cy.get("[data-cy='set-image-url-update-1']").click();
    cy.get("[data-cy='image-1']")
      .invoke("attr", "src")
      .should("eq", blissImageUrl);
    cy.get("[data-cy='image-back-button-1']").as("backButton").click();
    cy.get("@imageUrlInput").should("not.exist");
    cy.get("[data-cy='set-image-url-update-1']").should("not.exist");
    cy.get("@backButton").should("not.exist");
  });
  // it("Changes size of image", () => {
  //   cy.get("[data-cy='image-size-slider-0']").as("imageSlider");
  // });
});
