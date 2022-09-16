/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems';
import describeFeature from '../../test/cypress/utils/describe-feature';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Publications');
  cy.contains('h2', 'Publications');
};

describeFeature('Publications', '/publications', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
  });
});
