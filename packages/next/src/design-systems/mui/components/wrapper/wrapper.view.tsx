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

const mainClassName: string = validateString(styles.main);
const rootClassName: string = validateString(styles.root);

export default function MuiWrapper({
  breadcrumbs,
  children,
  fallback,
  notifications,
}: Readonly<Props>): ReactElement {
  const {
    handleNavigationClose,
    handleNavigationOpen,
    isNavigationOpen,
    mainStyle,
  } = useWrapper();

  return (
    <div className={rootClassName}>
      <Navigation
        onClose={handleNavigationClose}
        onOpen={handleNavigationOpen}
        open={isNavigationOpen}
      />
      <Notifications>{notifications}</Notifications>
      <main className={mainClassName} style={mainStyle}>
        {typeof breadcrumbs !== 'undefined' && (
          <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
        )}
        <Suspense fallback={<ContentFallback>{fallback}</ContentFallback>}>
          {children}
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}
