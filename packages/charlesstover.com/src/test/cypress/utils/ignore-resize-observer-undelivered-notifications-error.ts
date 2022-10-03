import filterErrorByResizeObserverUndeliveredNotifications from '../../utils/filter-error-by-resize-observer-undelivered-notifications';
import inverse from '../../utils/inverse';

export default function ignoreResizeObserverUndeliveredNotificationsError(): void {
  cy.on(
    'uncaught:exception',
    inverse(filterErrorByResizeObserverUndeliveredNotifications),
  );
}
