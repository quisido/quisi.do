'use client';

import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TabsProps } from '@awsui/components-react/tabs';
import { usePathname, useRouter } from 'next/navigation.js';
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import RunnableTabFinder from '../utils/runnable-tab-finder.js';
import useHash from './use-hash.js';
import useSearch from './use-search.js';

export interface Props {
  readonly defaultActiveTabId?: string | undefined;
  readonly tabs?: readonly TabsProps.Tab[] | undefined;
}

export interface State {
  readonly activeTabId: TabsProps['activeTabId'];
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly handleChange: (
    event: Readonly<NonCancelableCustomEvent<Readonly<TabsProps.ChangeDetail>>>,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});
const DEFAULT_TABS: TabsProps['tabs'] = Object.freeze([]);

export default function useNextTabs({
  defaultActiveTabId,
  tabs = DEFAULT_TABS,
}: Props = DEFAULT_PROPS): State {
  // Contexts
  const hash: string = useHash();
  const pathname: string = usePathname();
  const router = useRouter();
  const search: string = useSearch();

  // States
  const currentTab: TabsProps.Tab | undefined = useMemo(():
    | TabsProps.Tab
    | undefined => {
    const tabFinder: RunnableTabFinder = new RunnableTabFinder()
      .setHash(hash)
      .setPathname(pathname)
      .setSearch(search);
    return tabs.find(tabFinder.run.bind(tabFinder));
  }, [hash, pathname, search, tabs]);

  const ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (typeof currentTab === 'undefined' || ref.current === null) {
      return;
    }

    ref.current.scrollIntoView();
  }, [currentTab]);

  return {
    ref,

    activeTabId:
      typeof currentTab === 'undefined' ? defaultActiveTabId : currentTab.id,

    handleChange: useCallback(
      (
        e: Readonly<NonCancelableCustomEvent<Readonly<TabsProps.ChangeDetail>>>,
      ): void => {
        if (typeof e.detail.activeTabHref === 'undefined') {
          return;
        }

        router.push(e.detail.activeTabHref);
      },
      [router],
    ),
  };
}
