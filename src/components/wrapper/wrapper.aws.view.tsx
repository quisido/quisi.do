import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import AppLayout from '@awsui/components-react/app-layout';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import Breadcrumbs from './components/aws-breadcrumbs';
import Navigation from './components/aws-navigation';
import Notifications from './components/aws-notifications';
import Fallback from './components/fallback';
import Footer from './components/footer';
import type Props from './types/props';
import useAwsWrapper from './wrapper.aws.hook';

export default function AwsWrapper({
  Tools,
  breadcrumbs,
  children,
  contentType,
  fallback,
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
            <Suspense fallback={<Fallback>{fallback}</Fallback>}>
              {children}
            </Suspense>
            <Footer />
          </>
        }
      />
    </div>
  );
}
