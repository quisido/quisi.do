/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems';
import describeFeature from '../../test/cypress/utils/describe-feature';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'CharlesStover.com');
  cy.contains('h2', 'About me');
  cy.contains('h2', 'Projects');
};

describeFeature('Home', '/', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
  });
});