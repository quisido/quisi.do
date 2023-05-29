import SideNavigation from '@cloudscape-design/components/side-navigation';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { memo } from 'react';
import Div from '../../../../components/div';
import validateString from '../../../../../../utils/validate-string';
import useNavigation from './navigation.hook';
import styles from './navigation.module.scss';

const sideNavigationClassName: string = validateString(styles.sideNavigation);

function CloudscapeDesignWrapperNavigation(): ReactElement {
  const { activeHref, handleChange, handleFollow, items } = useNavigation();

  return (
    <>
      <Div element="h2" margin="medium">
        <I18n>Navigation</I18n>
      </Div>
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

export default memo(CloudscapeDesignWrapperNavigation);
