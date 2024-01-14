describe('Registration Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5173/signup');
    });
  
    it('should successfully register with valid details', () => {
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('SecurePassword123');
      cy.get('#confirmPassword').type('SecurePassword123');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/login');
    });
  
    it('should display an error message with mismatched passwords', () => {
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('SecurePassword123');
      cy.get('#confirmPassword').type('MismatchedPassword');
      cy.get('button[type="submit"]').click();
  
      cy.get('.error-message').should('be.visible');
    });
  
    it('should display an error message with invalid email format', () => {
      cy.get('#username').type('testuser');
      cy.get('#email').type('invalidemail');
      cy.get('#password').type('SecurePassword123');
      cy.get('#confirmPassword').type('SecurePassword123');
      cy.get('button[type="submit"]').click();
  
      cy.get('.error-message').should('be.visible');
    });
  
    it('should display an error message with too short password', () => {
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('ShortPW');
      cy.get('#confirmPassword').type('ShortPW');
      cy.get('button[type="submit"]').click();
  
      cy.get('.error-message').should('be.visible');
    });
  
    it('should display an error message with empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.get('.error-message').should('be.visible');
    });
  });
  