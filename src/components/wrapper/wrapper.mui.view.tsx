import type { ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import useMuiWrapper from './wrapper.mui.hook';
import Navigation from './wrapper.mui-navigation.view';
import Notifications from './wrapper.mui-notifications.view';
import type Props from './types/props';
import styles from './wrapper.mui.module.scss';

const rootClassName: string = validateString(styles.root);

export default function MuiWrapper({
  children,
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
      <main style={mainStyle}>{children}</main>
    </div>
  );
}
