import Box from '@awsui/components-react/box';
import SideNavigation from '@awsui/components-react/side-navigation';
import I18n from 'lazy-i18n';
import { ReactElement, memo } from 'react';
import useNavigation from './navigation.hook';
import styles from './navigation.module.scss';

function Navigation(): ReactElement {
  const { activeHref, handleChange, handleFollow, items } = useNavigation();

  return (
    <>
      <Box margin="m" variant="h2">
        <I18n>Navigation</I18n>
      </Box>
      <SideNavigation
        activeHref={activeHref}
        className={styles.sideNavigation}
        items={items}
        onChange={handleChange}
        onFollow={handleFollow}
      />
    </>
  );
}

export default memo(Navigation);
