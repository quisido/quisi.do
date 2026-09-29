import { type ComponentType } from 'react';

interface BaseNotification {
  readonly description: string;
  readonly Header?: ComponentType | undefined;
  readonly icon?: string | undefined;
  readonly Message: ComponentType;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

type Notification = ActionNotification | NoActionNotification;

export interface ActionNotification extends BaseNotification {
  readonly CallToAction: ComponentType;
  readonly onAction: VoidFunction;
}

export interface NoActionNotification extends BaseNotification {
  readonly CallToAction?: undefined;
  readonly onAction?: undefined;
}

export type { Notification as default };
