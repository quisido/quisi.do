/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems.js';
import describeFeature from '../../test/cypress/utils/describe-feature.js';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'quisi.do');
  cy.contains('h2', 'About');
  cy.contains('h2', 'Projects');
};

describeFeature('Home', '/', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
  });
});
