/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems.js';
import describeFeature from '../../test/cypress/utils/describe-feature.js';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Dashboard');
};

describeFeature('Dashboard', '/dashboard', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
  });
});
