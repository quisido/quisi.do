import { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { useSideNavigation } from 'use-awsui-router';
import useItems from './hooks/use-items';

interface State {
  activeHref: string;
  handleFollow: Required<SideNavigationProps>['onFollow'];
  items: SideNavigationProps.Item[];
}

export default function useNavigation(): State {
  const { activeHref, handleFollow } = useSideNavigation();

  return {
    activeHref,
    handleFollow,
    items: useItems(),
  };
}
