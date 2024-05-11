/// <reference types="cypress" />
import describeFeature from '../../test/cypress/utils/describe-feature.js';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Dashboard');
};

describeFeature('Dashboard', '/dashboard', (): void => {
  it('should display critical elements', shouldDisplayCriticalElements);
});
