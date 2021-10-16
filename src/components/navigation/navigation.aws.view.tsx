import SideNavigation from '@awsui/components-react/side-navigation';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { memo } from 'react';
import Box from '../../components/box';
import validateString from '../../utils/validate-string';
import useNavigation from './navigation.aws.hook';
import styles from './navigation.aws.module.scss';

const sideNavigationClassName: string = validateString(styles.sideNavigation);

function AwsNavigation(): ReactElement {
  const { activeHref, handleChange, handleFollow, items } = useNavigation();

  return (
    <>
      <Box element="h2" margin="medium">
        <I18n>Navigation</I18n>
      </Box>
      <SideNavigation
        activeHref={activeHref}
        className={sideNavigationClassName}
        items={items}
        onChange={handleChange}
        onFollow={handleFollow}
      />
    </>
  );
}

export default memo(AwsNavigation);
