import AppLayout, { AppLayoutProps } from '@awsui/components-react/app-layout';
import Box, { BoxProps } from '@awsui/components-react/box';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { ReactElement, ReactNode } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import Navigation from '../../components/navigation';
import Notifications from '../../components/notifications';
import Tools from '../../components/tools';
import useAppLayout from '../../hooks/use-app-layout';

interface Props {
  breadcrumbs?: BreadcrumbGroupProps.Item[];
  children: ReactNode;
  notifications?: FlashbarProps.MessageDefinition[] | null;
}

const ARIA_LABELS: AppLayoutProps.Labels = {
  navigation: 'Navigation',
  navigationToggle: 'Toggle navigation',
  navigationClose: 'Close navigation',
  notifications: 'Notifications',
  tools: 'Tools',
  toolsToggle: 'Toogle tools',
  toolsClose: 'Close tools',
};

const CONTENT_MARGIN: BoxProps.Spacing = {
  bottom: 'm',
};

export default function CSAppLayout({
  breadcrumbs,
  children,
  notifications,
}: Props): ReactElement {
  const {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    toolsOpen,
  } = useAppLayout({
    defaultToolsOpen: false,
  });

  return (
    <AppLayout
      ariaLabels={ARIA_LABELS}
      breadcrumbs={<Breadcrumbs>{breadcrumbs}</Breadcrumbs>}
      content={<Box margin={CONTENT_MARGIN}>{children}</Box>}
      navigation={<Navigation />}
      navigationOpen={navigationOpen}
      notifications={<Notifications>{notifications}</Notifications>}
      onNavigationChange={handleNavigationChange}
      onToolsChange={handleToolsChange}
      tools={<Tools />}
      toolsHide={true}
      toolsOpen={toolsOpen}
    />
  );
}
