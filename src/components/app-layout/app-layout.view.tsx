import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import AppLayout from '@awsui/components-react/app-layout';
import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import Footer from '../../components/footer';
import Navigation from '../../components/navigation';
import Notifications from '../../components/notifications';
import useCustomAppLayout from './app-layout.hook';

interface Props {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly Tools?: ComponentType<unknown>;
  readonly breadcrumbs?: readonly BreadcrumbGroupProps.Item[];
  readonly children: ReactNode;
  readonly contentType?: AppLayoutProps.ContentType;
  readonly notifications?: readonly FlashbarProps.MessageDefinition[];
  readonly onToolsChange?: AppLayoutProps['onToolsChange'];
  readonly toolsHide?: boolean;
  readonly toolsOpen?: boolean;
}

export default function CustomAppLayout({
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

  return (
    <div ref={ref}>
      <AppLayout
        ariaLabels={ariaLabels}
        breadcrumbs={<Breadcrumbs>{breadcrumbs}</Breadcrumbs>}
        contentType={contentType}
        navigation={<Navigation />}
        navigationOpen={navigationOpen}
        notifications={<Notifications>{notifications}</Notifications>}
        onNavigationChange={handleNavigationChange}
        onToolsChange={handleToolsChange}
        tools={Tools && <Tools />}
        toolsHide={toolsHide}
        toolsOpen={toolsOpen}
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
