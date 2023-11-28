import { type ComponentType } from 'react';

interface BaseNotification {
  readonly Header?: ComponentType | string | undefined;
  readonly icon?: string | undefined;
  readonly Message: ComponentType | string;
  readonly onDismiss?: VoidFunction | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

export interface ActionNotification extends BaseNotification {
  readonly CallToAction: ComponentType;
  readonly onAction: VoidFunction;
}

export interface NoActionNotification extends BaseNotification {
  readonly CallToAction?: undefined;
  readonly onAction?: undefined;
}

type Notification = ActionNotification | NoActionNotification;

export type { Notification as default };
