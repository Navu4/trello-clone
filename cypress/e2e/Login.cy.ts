describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/login');
  });

  it('should successfully log in with correct email and password', () => {
    cy.get('#email').type('singh@gmail.com');
    cy.get('#password').type('singh@gmail.com');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
  });

  it('should display an error message with incorrect email', () => {
    cy.get('#email').type('invalid@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('#toast-error').should('be.visible');
  });

  it('should display an error message with incorrect password', () => {
    cy.get('#email').type('user@example.com');
    cy.get('#password').type('incorrectpassword');
    cy.get('button[type="submit"]').click();

    cy.get('#toast-error').should('be.visible');
  });

  it('should display an error message with empty email and password', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });
});
