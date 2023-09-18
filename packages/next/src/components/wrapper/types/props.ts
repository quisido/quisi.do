import type { ComponentType, ReactNode } from 'react';
import type Breadcrumb from '../../../types/breadcrumb';
import type Notification from '../../../types/notification';

export default interface Props {
  readonly Info?: ComponentType | undefined;
  readonly breadcrumbs?: readonly Readonly<Breadcrumb>[] | undefined;
  readonly contentType?: 'table' | 'wizard' | undefined;
  readonly fallback?: ReactNode | undefined;
  readonly notifications?: readonly Readonly<Notification>[] | undefined;
}
