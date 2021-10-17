import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType, ReactNode } from 'react';
import type Breadcrumb from '../../../types/breadcrumb';

export default interface Props {
  readonly Tools?: ComponentType<unknown>;
  readonly breadcrumbs?: readonly Breadcrumb[];
  readonly children: ReactNode;
  readonly contentType?: AppLayoutProps.ContentType;
  readonly notifications?: readonly FlashbarProps.MessageDefinition[];
  readonly toolsHide?: boolean;
  readonly toolsOpen?: boolean;
  readonly onToolsChange?: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}
