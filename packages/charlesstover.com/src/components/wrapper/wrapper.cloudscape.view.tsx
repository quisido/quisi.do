import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AppLayout from '@cloudscape-design/components/app-layout';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import findDefined from '../../utils/find-defined';
import validateString from '../../utils/validate-string';
import Breadcrumbs from './components/cloudscape-breadcrumbs';
import Navigation from './components/cloudscape-navigation';
import Notifications from './components/cloudscape-notifications';
import Fallback from './components/fallback';
import Footer from './components/footer';
import type Props from './types/props';
import useCloudscapeWrapper from './wrapper.cloudscape.hook';
import styles from './wrapper.cloudscape.module.scss';

const contentClassName: string = validateString(styles.content);

export default function CloudscapeWrapper({
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
  } = useCloudscapeWrapper({
    controlledToolsOpen,
    onToolsChange,
  });

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional
  //   properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<
    AppLayoutProps,
    'contentType' | 'navigationOpen' | 'toolsHide' | 'toolsOpen'
  > = {};
  if (findDefined(contentType)) {
    optionalProps.contentType = contentType;
  }
  if (findDefined(navigationOpen)) {
    optionalProps.navigationOpen = navigationOpen;
  }
  if (findDefined(toolsHide)) {
    optionalProps.toolsHide = toolsHide;
  }
  if (findDefined(toolsOpen)) {
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
          <div className={contentClassName}>
            <Suspense fallback={<Fallback fallback={fallback} />}>
              {children}
            </Suspense>
            <Footer />
          </div>
        }
      />
    </div>
  );
}
