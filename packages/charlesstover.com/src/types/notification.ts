import type { ComponentType, ReactNode } from 'react';

interface BaseNotification {
  readonly message: ReactNode;
  readonly onDismiss?: VoidFunction | undefined;
  readonly type: 'error';
}

interface ActionNotification {
  readonly CallToAction: ComponentType<unknown>;
  readonly onAction: VoidFunction;
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
