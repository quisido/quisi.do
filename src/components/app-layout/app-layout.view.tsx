import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import AppLayout from '@awsui/components-react/app-layout';
import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import Footer from '../../components/footer';
import Navigation from '../../components/navigation';
import Notifications from '../../components/notifications';
import useCustomAppLayout from './app-layout.hook';

interface Props {
  readonly Tools?: ComponentType<unknown>;
  readonly breadcrumbs?: readonly BreadcrumbGroupProps.Item[];
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

export default function CustomAppLayout({
  Tools,
  breadcrumbs,
  children,
  contentType,
  notifications,
  onToolsChange,
  toolsHide,
  toolsOpen: controlledToolsOpen,
}: Props): ReactElement {
  const {
    ariaLabels,
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    ref,
    toolsOpen,
  } = useCustomAppLayout({
    controlledToolsOpen,
    onToolsChange,
  });

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<
    AppLayoutProps,
    'contentType' | 'navigationOpen' | 'toolsHide' | 'toolsOpen'
  > = {};
  if (typeof contentType !== 'undefined') {
    optionalProps.contentType = contentType;
  }
  if (typeof navigationOpen !== 'undefined') {
    optionalProps.navigationOpen = navigationOpen;
  }
  if (typeof toolsHide !== 'undefined') {
    optionalProps.toolsHide = toolsHide;
  }
  if (typeof toolsOpen !== 'undefined') {
    optionalProps.toolsOpen = toolsOpen;
  }

  return (
    <div ref={ref}>
      <AppLayout
        ariaLabels={ariaLabels}
        breadcrumbs={<Breadcrumbs>{breadcrumbs}</Breadcrumbs>}
        navigation={<Navigation />}
        notifications={<Notifications>{notifications}</Notifications>}
        onNavigationChange={handleNavigationChange}
        onToolsChange={handleToolsChange}
        tools={Tools && <Tools />}
        {...optionalProps}
        content={
          <>
            {children}
            <Footer />
          </>
        }
      />
    </div>
  );
}
