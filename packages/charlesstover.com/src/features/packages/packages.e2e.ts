/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems';
import describeFeature from '../../test/cypress/utils/describe-feature';

const NEXT_PAGE_SELECTOR = 'main button[aria-label="Go to next page"]';
const FIRST_PACKAGE_SELECTOR =
  'main table > tbody > tr:first-child > td:first-child a';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Packages');
  cy.contains('h2', 'Packages');
};

const shouldPaginate = (): void => {
  cy.get(FIRST_PACKAGE_SELECTOR)
    .invoke('text')
    .then((page1package1name: string): void => {
      cy.get(NEXT_PAGE_SELECTOR).click({ scrollBehavior: 'center' });
      cy.screenshot();

      cy.get(FIRST_PACKAGE_SELECTOR).should('not.contain', page1package1name);
    });
};

describeFeature('Packages', '/packages', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
    it('should paginate', shouldPaginate);
  });
});
