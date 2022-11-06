/// <reference types="cypress" />

import select from '../../test/cypress/utils/select';

const mapDesignSystemNameToTestSuite = (
  name: string,
): ((suite: VoidFunction) => void) => {
  return function test(suite: VoidFunction): void {
    describe(`${name} design system`, (): void => {
      beforeEach((): void => {
        cy.get('*[role="button"]').contains('Settings').click();
        select('Design system', name, {
          parentSelector: 'nav ul > li',
        });
      });

      suite();
    });
  };
};

const DESIGN_SYSTEMS: readonly ((suite: VoidFunction) => void)[] = [
  mapDesignSystemNameToTestSuite('AWS'),
  mapDesignSystemNameToTestSuite('Cloudscape'),
  mapDesignSystemNameToTestSuite('Material'),
];

describe('Packages', (): void => {
  beforeEach((): void => {
    cy.visit('/packages');
  });

  for (const test of DESIGN_SYSTEMS) {
    test((): void => {
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
