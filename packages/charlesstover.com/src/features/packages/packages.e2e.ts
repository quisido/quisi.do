/// <reference types="cypress" />

import setDesignSystem from '../../test/cypress/utils/set-design-system';

const DESIGN_SYSTEMS: string[] = ['AWS', 'Cloudscape', 'Material'];

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Packages');
  cy.contains('h2', 'Packages');
};

const shouldPaginate = (): void => {
  cy.get('main table > tbody > tr > td a')
    .first()
    .invoke('text')
    .then((page1package1: string): void => {
      cy.get('button[aria-label="Go to next page"]').scrollIntoView().click();
      cy.get('main table > tbody > tr > td a')
        .first()
        .invoke('text')
        .then((page2package1: string): void => {
          expect(page1package1).not.to.eq(page2package1);
        });
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
