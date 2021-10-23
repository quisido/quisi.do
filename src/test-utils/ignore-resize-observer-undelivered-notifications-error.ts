/// <reference types="cypress" />

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on('uncaught:exception', (err: Readonly<Error>): boolean => {
    throw new Error(`{${JSON.stringify(err.message)}}`);
  });
}
