/// <reference types="cypress" />

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on('uncaught:exception', (err: Readonly<Error>): boolean => {
    if (
      err.message ===
      'ResizeObserver loop completed with undelivered notifications.'
    ) {
      return false;
    }

    return true;
  });
}
