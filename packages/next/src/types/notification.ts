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

type Notification = BaseNotification &
  (ActionNotification | NoActionNotification);

export type { Notification as default };
