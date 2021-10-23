/// <reference types="cypress" />

const filterErrorByResizeObserverUndeliveredNotificationsError = (
  err: Readonly<Error>,
): boolean =>
  err.message.includes(
    'ResizeObserver loop completed with undelivered notifications.',
  );

const inverse =
  <T>(f: (value: T) => boolean): ((value: T) => boolean) =>
  (value: T): boolean =>
    !f(value);

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on(
    'uncaught:exception',
    inverse(filterErrorByResizeObserverUndeliveredNotificationsError),
  );
}
