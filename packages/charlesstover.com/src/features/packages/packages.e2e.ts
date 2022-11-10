/// <reference types="cypress" />

import setDesignSystem from '../../test/cypress/utils/set-design-system';

const FIRST_PACKAGE_SELECTOR =
  'main table > tbody > tr:first-child > td:first-child a';
const DESIGN_SYSTEMS: string[] = ['AWS', 'Cloudscape', 'Material'];

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Packages');
  cy.contains('h2', 'Packages');
};

const shouldPaginate = (): void => {
  cy.get(FIRST_PACKAGE_SELECTOR)
    .invoke('text')
    .then((page1package1name: string): void => {
      cy.get('button[aria-label="Go to next page"]')
        .last()
        .scrollIntoView()
        .click();
      cy.get(FIRST_PACKAGE_SELECTOR).should('not.contain', page1package1name);
    });
};

describe('Packages', (): void => {
  beforeEach((): void => {
    cy.visit('/packages');
  });

  for (const designSystem of DESIGN_SYSTEMS) {
    describe(designSystem, (): void => {
      setDesignSystem(designSystem);
      it('should display critical elements', shouldDisplayCriticalElements);
      it('should paginate', shouldPaginate);
    });
  }
});
