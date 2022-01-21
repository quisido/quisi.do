/// <reference types="cypress" />

import ignoreResizeObserverUndeliveredNotificationsError from '../../test/utils/ignore-resize-observer-undelivered-notifications-error';

describe('Quotes', (): void => {
  it('should display critical elements', (): void => {
    ignoreResizeObserverUndeliveredNotificationsError();
    cy.visit('/quotes');
    cy.screenshot();
    cy.contains('nav', 'Quotes');
  });
});
