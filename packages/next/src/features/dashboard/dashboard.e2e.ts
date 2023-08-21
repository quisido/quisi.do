/// <reference types="cypress" />
import describeDesignSystems from '../../test/cypress/utils/describe-design-systems';
import describeFeature from '../../test/cypress/utils/describe-feature';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Dashboard');
};

describeFeature('Dashboard', '/dashboard', (): void => {
  describeDesignSystems((): void => {
    it('should display critical elements', shouldDisplayCriticalElements);
  });
});
