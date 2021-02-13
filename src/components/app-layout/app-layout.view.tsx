import AppLayout, { AppLayoutProps } from '@awsui/components-react/app-layout';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { ComponentType, ReactElement, ReactNode } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import Navigation from '../../components/navigation';
import Notifications from '../../components/notifications';
import useCSAppLayout from './app-layout.hook';

interface Props {
  Tools?: ComponentType<unknown>;
  breadcrumbs?: BreadcrumbGroupProps.Item[];
  children: ReactNode;
  contentType?: AppLayoutProps.ContentType;
  notifications?: FlashbarProps.MessageDefinition[];
  onToolsChange?: AppLayoutProps['onToolsChange'];
  toolsHide?: boolean;
  toolsOpen?: boolean;
}

export default function CSAppLayout({
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
    toolsOpen,
  } = useCSAppLayout({
    controlledToolsOpen,
    onToolsChange,
  });

  return (
    <AppLayout
      ariaLabels={ariaLabels}
      breadcrumbs={<Breadcrumbs>{breadcrumbs}</Breadcrumbs>}
      content={children}
      contentType={contentType}
      navigation={<Navigation />}
      navigationOpen={navigationOpen}
      notifications={<Notifications>{notifications}</Notifications>}
      onNavigationChange={handleNavigationChange}
      onToolsChange={handleToolsChange}
      tools={Tools && <Tools />}
      toolsHide={toolsHide}
      toolsOpen={toolsOpen}
    />
  );
}
