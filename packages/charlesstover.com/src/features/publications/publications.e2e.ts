/// <reference types="cypress" />

import ignoreResizeObserverUndeliveredNotificationsError from '../../test/cypress/utils/ignore-resize-observer-undelivered-notifications-error';

describe('Publications', (): void => {
  it('should display critical elements', (): void => {
    ignoreResizeObserverUndeliveredNotificationsError();
    cy.visit('/publications');
    cy.screenshot();
    cy.contains('nav', 'Publications');
    cy.contains('h2', 'Publications');
  });
});
