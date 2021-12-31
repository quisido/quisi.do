import type { ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import Footer from './components/footer';
import useMuiWrapper from './wrapper.mui.hook';
import Breadcrumbs from './wrapper.mui-breadcrumbs.view';
import Navigation from './wrapper.mui-navigation.view';
import Notifications from './wrapper.mui-notifications.view';
import type Props from './types/props';
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
