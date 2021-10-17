import type { ComponentType, ReactNode } from 'react';

interface BaseNotification {
  readonly message: ReactNode;
  readonly onDismiss?: (() => void) | undefined;
  readonly type: 'error';
}

interface ActionNotification {
  readonly CallToAction: ComponentType<unknown>;
  readonly onAction: () => void;
}

interface NoActionNotification {
  readonly CallToAction?: undefined;
  readonly onAction?: undefined;
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type Notification =
  // eslint-disable-next-line @typescript-eslint/no-type-alias
  BaseNotification & (ActionNotification | NoActionNotification);

export default Notification;
