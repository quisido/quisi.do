/// <reference types="cypress" />

describe('Dashboard', (): void => {
  it('should display critical elements', (): void => {
    cy.visit('/dashboard');
    cy.contains('nav', 'Dashboard');
  });
});
