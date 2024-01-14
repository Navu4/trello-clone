describe("Project Board Tests", () => {

  it("should be able to create new card in the first column", () => {
    login();
    openFirstProject();
    cy.get('.add-new-card').first().click();
    cy.focused().then(() => {
        cy.get('#newCardInputElement').type('Trello Clone Task').type('{enter}')
    }); 

    cy.get("#46191127-e97c-4f93-a86e-7c14f0f36ad0").drag('#c9bd4bae-8dbe-41df-bc19-70afe2534959', {
      force : true
    })
  });
});

function openFirstProject() {
    cy.url().should("include", "/dashboard");

    let dataId;
    cy.get(".boards-cards button").then(($div) => {
      dataId = Cypress.$($div).attr("data-btn");
    });
    cy.get(".boards-cards button").click();
    cy.url().should("include", `/board/`);
}

function login() {
  cy.visit("http://127.0.0.1:5173/login");
  cy.get("#email").type("singh@gmail.com");
  cy.get("#password").type("singh@gmail.com");
  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/");
}