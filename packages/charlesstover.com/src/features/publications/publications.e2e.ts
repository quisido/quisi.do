/// <reference types="cypress" />

describe('Publications', (): void => {
  it('should display critical elements', (): void => {
    cy.visit('/publications');
    cy.contains('nav', 'Publications');
  });
});
