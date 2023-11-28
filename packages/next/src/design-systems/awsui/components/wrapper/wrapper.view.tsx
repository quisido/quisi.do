import AppLayout, {
  type AppLayoutProps,
} from '@awsui/components-react/app-layout';
import { type PropsWithChildren, type ReactElement, Suspense } from 'react';
import { type Props } from '../../../../components/wrapper';
import ContentFallback from '../../../../components/wrapper-content-fallback';
import Footer from '../../../../components/wrapper-footer';
import Breadcrumbs from './components/breadcrumbs';
import Navigation from './components/navigation';
import Notifications from './components/notifications';
import useWrapper from './wrapper.hook';

export default function AwsuiWrapper({
  Info,
  breadcrumbs,
  children,
  contentType,
  fallback,
  notifications,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  const {
    ariaLabels,
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    ref,
    toolsOpen,
  } = useWrapper();

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

  return (
    <div ref={ref}>
      <AppLayout
        ariaLabels={ariaLabels}
        navigation={<Navigation />}
        notifications={<Notifications>{notifications}</Notifications>}
        onNavigationChange={handleNavigationChange}
        onToolsChange={handleToolsChange}
        tools={typeof Info !== 'undefined' && <Info />}
        toolsHide={typeof Info === 'undefined'}
        toolsOpen={toolsOpen}
        {...optionalProps}
        breadcrumbs={
          typeof breadcrumbs !== 'undefined' && (
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
          )
        }
        content={
          <>
            <Suspense fallback={<ContentFallback>{fallback}</ContentFallback>}>
              {children}
            </Suspense>
            <Footer />
          </>
        }
      />
    </div>
  );
}
