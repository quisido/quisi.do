import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { NextRouter, useRouter } from 'next/router';
import useEffectEvent from './use-effect-event.js';
import useHash from './use-hash.js';
import useSearch from './use-search.js';

export interface State {
  readonly activeHref: string;
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<SideNavigationProps.FollowDetail>>>,
  ) => void;
}

export default function useSideNavigation(): State {
  // Contexts
  const hash: string = useHash();
  const router: NextRouter = useRouter();
  const search: string = useSearch();

  return {
    activeHref: `${router.pathname}${search}${hash}`,

    handleFollow: useEffectEvent(
      (
        e: Readonly<CustomEvent<Readonly<SideNavigationProps.FollowDetail>>>,
      ): void => {
        if (e.detail.external === true) {
          return;
        }
        e.preventDefault();
        router.push(e.detail.href);
      },
    ),
  };
}
