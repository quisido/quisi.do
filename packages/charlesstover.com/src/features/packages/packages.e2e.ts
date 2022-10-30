/// <reference types="cypress" />

describe('Packages', (): void => {
  it('should display critical elements', (): void => {
    cy.visit('/packages');
    cy.contains('nav', 'Packages');
    cy.contains('h2', 'Packages');
  });
});

export default null;
