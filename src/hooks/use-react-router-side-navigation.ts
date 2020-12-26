import { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { History } from 'history';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';

interface State {
  activeHref: string;
  handleFollow: Required<SideNavigationProps>['onFollow'];
}

export default function useReactRouterSideNavigation(): State {
  const history: History<unknown> = useHistory();

  const { hash, pathname, search } = useLocation();
  const activeHref = `${pathname}${search}${hash}`;

  const handleFollow = useCallback(
    (e: CustomEvent<SideNavigationProps.FollowDetail>): void => {
      if (e.detail.external) {
        return;
      }
      e.preventDefault();
      history.push(e.detail.href);
    },
    [history],
  );

  return {
    activeHref,
    handleFollow,
  };
}
