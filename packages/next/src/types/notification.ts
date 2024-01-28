import { type ComponentType, type ReactNode } from 'react';

interface BaseNotification {
  readonly Header?: ComponentType | undefined;
  readonly icon?: string | undefined;
  readonly message: ReactNode;
  readonly onDismiss?: VoidFunction | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

interface ActionNotification {
  readonly CallToAction: ComponentType;
  readonly onAction: VoidFunction;
}

interface NoActionNotification {
  readonly CallToAction?: undefined;
  readonly onAction?: undefined;
}

type Notification = BaseNotification &
  (ActionNotification | NoActionNotification);

export type { Notification as default };
