import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import AppLayout from '@awsui/components-react/app-layout';
import type { ReactElement } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import Footer from '../../components/footer';
import Notifications from '../../components/notifications';
import type Breadcrumb from '../../types/breadcrumb';
import useAwsWrapper from './wrapper.aws.hook';
import Navigation from './wrapper.aws-navigation.view';
import type Props from './types/props';

const DEFAULT_BREADCRUMBS: readonly Breadcrumb[] = Object.freeze([]);

export default function AwsWrapper({
  Tools,
  breadcrumbs = DEFAULT_BREADCRUMBS,
  children,
  contentType,
  notifications,
  onToolsChange,
  toolsHide,
  toolsOpen: controlledToolsOpen,
}: Readonly<Props>): ReactElement {
  const {
    ariaLabels,
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    ref,
    toolsOpen,
  } = useAwsWrapper({
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
