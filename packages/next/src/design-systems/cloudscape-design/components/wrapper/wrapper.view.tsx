import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AppLayout from '@cloudscape-design/components/app-layout';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import type { Props } from '../../../../components/wrapper';
import ContentFallback from '../../../../components/wrapper-content-fallback';
import Footer from '../../../../components/wrapper-footer';
import validateString from '../../../../utils/validate-string';
import Breadcrumbs from './components/breadcrumbs';
import Navigation from './components/navigation';
import Notifications from './components/notifications';
import useWrapper from './wrapper.hook';
import styles from './wrapper.module.scss';

const contentClassName: string = validateString(styles.content);

export default function CloudscapeDesignWrapper({
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
  } = useWrapper({
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
        navigation={<Navigation />}
        notifications={<Notifications>{notifications}</Notifications>}
        onNavigationChange={handleNavigationChange}
        onToolsChange={handleToolsChange}
        tools={Tools && <Tools />}
        {...optionalProps}
        breadcrumbs={
          typeof breadcrumbs !== 'undefined' && (
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
          )
        }
        content={
          <div className={contentClassName}>
            <Suspense fallback={<ContentFallback>{fallback}</ContentFallback>}>
              {children}
            </Suspense>
            <Footer />
          </div>
        }
      />
    </div>
  );
}
