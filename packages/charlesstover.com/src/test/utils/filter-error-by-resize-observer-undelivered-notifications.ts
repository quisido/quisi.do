export default function filterErrorByResizeObserverUndeliveredNotifications(
  err: Readonly<Error>,
): boolean {
  return err.message.includes(
    'ResizeObserver loop completed with undelivered notifications.',
  );
}
