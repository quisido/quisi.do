'use client';

import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { usePathname, useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import useEffectEvent from './use-effect-event.js';
import useHash from './use-hash.js';
import useSearch from './use-search.js';

interface Props {
  readonly hrefs?: Iterable<string> | undefined;
}

export interface State {
  readonly activeHref: string;
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<SideNavigationProps.FollowDetail>>>,
  ) => void;
}

const EMPTY_ARRAY: readonly string[] = [];
const DEFAULT_PROPS: Props = {};

export default function useSideNavigation({
  hrefs = EMPTY_ARRAY,
}: Props = DEFAULT_PROPS): State {
  // Contexts
  const hash: string = useHash();
  const pathname: string = usePathname();
  const router = useRouter();
  const search: string = useSearch();

  useEffect((): void => {
    for (const href of hrefs) {
      router.prefetch(href);
    }
  }, [hrefs, router]);

  return {
    activeHref: `${pathname}${search}${hash}`,

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
