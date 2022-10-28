/// <reference types="cypress" />

import ignoreOptionalDependencies from '../../test/cypress/utils/ignore-optional-dependencies';
import ignoreResizeObserverUndeliveredNotificationsError from '../../test/cypress/utils/ignore-resize-observer-undelivered-notifications-error';

describe('Publications', (): void => {
  it('should display critical elements', (): void => {
    ignoreOptionalDependencies();
    ignoreResizeObserverUndeliveredNotificationsError();

    cy.visit('/publications');
    cy.contains('nav', 'Publications');
  });
});
