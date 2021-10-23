/// <reference types="cypress" />

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on('uncaught:exception', (err: Readonly<Error>): boolean => {
    console.log(JSON.stringify(err.message));
    return false;
  });
}
