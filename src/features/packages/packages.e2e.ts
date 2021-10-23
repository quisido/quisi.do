/// <reference types="cypress" />

import ignoreResizeObserverUndeliveredNotificationsError from '../../test-utils/ignore-resize-observer-undelivered-notifications-error';

describe('Packages', (): void => {
  it('should display critical elements', (): void => {
    ignoreResizeObserverUndeliveredNotificationsError();
    cy.visit('/packages');
    cy.contains('nav', 'Packages');
    cy.contains('h2', 'Packages');
  });
});
