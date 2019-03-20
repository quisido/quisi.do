/// <reference types="cypress" />

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on(
    'uncaught:exception',
    (err: Readonly<Error>): boolean =>
      !err.message.includes(
        'ResizeObserver loop completed with undelivered notifications.',
      ),
  );
}
