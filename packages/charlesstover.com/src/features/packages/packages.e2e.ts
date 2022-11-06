/// <reference types="cypress" />

import select from '../../test/cypress/utils/select';

const setDesignSystem = (name: string): void => {
  beforeEach((): void => {
    cy.get('*[role="button"]').contains('Settings').click();
    select('Design system', name, {
      parentSelector: 'nav ul > li',
    });
  });
};

const DESIGN_SYSTEMS: string[] = ['AWS', 'Cloudscape', 'Material'];

describe('Packages', (): void => {
  beforeEach((): void => {
    cy.visit('/packages');
  });

  for (const designSystem of DESIGN_SYSTEMS) {
    describe(designSystem, (): void => {
      setDesignSystem(designSystem);

      it('should display critical elements', (): void => {
        cy.contains('nav', 'Packages');
        cy.contains('h2', 'Packages');
      });

      it('should paginate', (): void => {
        const PAGE_1_PACKAGE_1 = cy
          .get('main table > tbody > tr > td a')
          .first()
          .invoke('text');

        cy.get('button[aria-label="Go to next page"]').click();

        const PAGE_2_PACKAGE_1 = cy
          .get('main table > tbody > tr > td a')
          .first()
          .invoke('text');

        expect(PAGE_1_PACKAGE_1).not.to.eq(PAGE_2_PACKAGE_1);
      });
    });
  }
});
