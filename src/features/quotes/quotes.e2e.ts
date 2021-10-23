/// <reference types="cypress" />

describe('Quotes', (): void => {
  it('should display critical elements', (): void => {
    cy.visit('/quotes');
    cy.contains('nav', 'Quotes');
  });
});
