import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType, ReactNode } from 'react';
import type Breadcrumb from '../../../types/breadcrumb';
import type Notification from '../../../types/notification';

export default interface Props {
  readonly Tools?: ComponentType<unknown>;
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
  readonly children: ReactNode;
  readonly contentType?: AppLayoutProps.ContentType;
  readonly notifications?: undefined | readonly Readonly<Notification>[];
  readonly toolsHide?: boolean;
  readonly toolsOpen?: boolean;
  readonly onToolsChange?: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}
