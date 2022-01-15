import type { ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import Footer from './components/footer';
import Breadcrumbs from './components/mui-breadcrumbs';
import Navigation from './components/mui-navigation';
import Notifications from './components/mui-notifications';
import type Props from './types/props';
import useMuiWrapper from './wrapper.mui.hook';
import styles from './wrapper.mui.module.scss';

const mainClassName: string = validateString(styles.main);
const rootClassName: string = validateString(styles.root);

export default function MuiWrapper({
  children,
  breadcrumbs,
  notifications,
}: Readonly<Props>): ReactElement {
  const {
    handleNavigationClose,
    handleNavigationOpen,
    isNavigationOpen,
    mainStyle,
  } = useMuiWrapper();

  return (
    <div className={rootClassName}>
      <Navigation
        onClose={handleNavigationClose}
        onOpen={handleNavigationOpen}
        open={isNavigationOpen}
      />
      <Notifications>{notifications}</Notifications>
      <main className={mainClassName} style={mainStyle}>
        <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
        {children}
        <Footer />
      </main>
    </div>
  );
}
