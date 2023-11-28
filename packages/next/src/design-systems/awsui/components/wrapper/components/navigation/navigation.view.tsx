import SideNavigation from '@awsui/components-react/side-navigation';
import I18n from 'lazy-i18n';
import { type ReactElement, memo } from 'react';
import validateString from '../../../../../../utils/validate-string';
import Div from '../../../div';
import useNavigation from './navigation.hook';
import styles from './navigation.module.scss';

const sideNavigationClassName: string = validateString(styles.sideNavigation);

function AwsuiWrapperNavigation(): ReactElement {
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

export default memo(AwsuiWrapperNavigation);
