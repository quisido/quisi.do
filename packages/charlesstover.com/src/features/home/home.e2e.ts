/// <reference types="cypress" />

describe('Home', (): void => {
  it('should mount by default', (): void => {
    cy.visit('/');
    cy.screenshot();
    cy.contains('nav', 'CharlesStover.com');
    cy.contains('h2', 'About me');
    cy.contains('h2', 'Projects');
  });
});

export default null;
