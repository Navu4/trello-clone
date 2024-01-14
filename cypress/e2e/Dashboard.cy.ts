describe("Dashboard Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  it("should create first dashboard project with relevent information", () => {
    newUserLogin();

    cy.url().should("include", "/create-first-dashboard");
    cy.get('[data-title="create-board-title"]').contains("Welcome to Trello!");
    cy.get('[data-btn="create-board-btn"]').click();

    cy.url().should("include", "/first-dashboard-info");
    cy.get('[data-title="first-board-title"]').contains(
      "It all starts with the board"
    );

    // Board Name Validation Check
    cy.get('[data-btn="next-step-btn"]').click();
    cy.get(".error-message").should("be.visible");

    cy.get("#board-name").type("My Trackier Board");
    cy.get('[data-btn="next-step-btn"]').click();

    cy.url().should("include", "/first-dashboard-info");

    // Description Validation Check
    cy.get('[data-btn="next-step-btn"]').click();
    cy.get(".error-message").should("be.visible");

    cy.get("#boardDescription").type(
      "This is Web Application Task Tracking Board"
    );
    cy.get('[data-btn="next-step-btn"]').click();

    cy.url().should("include", "/first-dashboard-info");

    cy.get('[data-btn="skip-step-btn"]').click();

    cy.url().should("include", "/dashboard");
  });

  it("should directly go to dashboard after login and show existing card", async () => {
    existingUserLogin();

    cy.url().should("include", "/dashboard");

    let dataId;
    cy.get('.boards-cards button').then(($div) => {
      dataId = Cypress.$($div).attr("data-btn");
    });
    cy.get(".boards-cards button").click();
    cy.url().should('include', `/board/${dataId}`);
  });
});

function existingUserLogin() {
  cy.get("#email").type("singh@gmail.com");
  cy.get("#password").type("singh@gmail.com");
  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/");
}

function newUserLogin() {
  cy.get("#email").type("singh1@gmail.com");
  cy.get("#password").type("singh1@gmail.com");
  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/");
}
