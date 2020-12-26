import { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { useCallback, useState } from 'react';

interface Props {
  defaultActiveHref?: string;
}

interface State {
  activeHref: string;
  handleFollow: Required<SideNavigationProps>['onFollow'];
}

const DEFAULT_PROPS: Props = Object.freeze(Object.create(null));

export default function useSideNavigation(props: Props = DEFAULT_PROPS): State {
  const { defaultActiveHref = '/' } = props;

  const [activeHref, setActiveHref] = useState(defaultActiveHref);

  const handleFollow = useCallback(
    (e: CustomEvent<SideNavigationProps.FollowDetail>): void => {
      setActiveHref(e.detail.href);
    },
    [],
  );

  return {
    activeHref,
    handleFollow,
  };
}
