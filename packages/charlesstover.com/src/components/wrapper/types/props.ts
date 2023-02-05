import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType, ReactNode } from 'react';
import type Breadcrumb from '../../../types/breadcrumb';
import type Notification from '../../../types/notification';

// TODO: Technical debt. Abstract `Tools` and `onToolsChange`.

export default interface Props {
  readonly Tools?: ComponentType<unknown> | undefined;
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
  readonly children: ReactNode;
  readonly contentType?: 'table' | 'wizard' | undefined;
  readonly fallback?: ReactNode | undefined;
  readonly notifications?: readonly Readonly<Notification>[] | undefined;
  readonly toolsHide?: boolean | undefined;
  readonly toolsOpen?: boolean | undefined;
  readonly onToolsChange?:
    | ((
        event: Readonly<
          NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
        >,
      ) => void)
    | undefined;
}
