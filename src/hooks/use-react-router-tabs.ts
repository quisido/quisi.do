import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { TabsProps } from '@awsui/components-react/tabs';
import { History } from 'history';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

interface Props {
  defaultActiveTabId?: string;
  tabs?: TabsProps['tabs'];
}

interface State {
  activeTabId: TabsProps['activeTabId'];
  handleChange: TabsProps['onChange'];
  ref: MutableRefObject<HTMLDivElement | null>;
}

const DEFAULT_PROPS: Props = Object.freeze(Object.create(null));
const DEFAULT_TABS: TabsProps['tabs'] = Object.freeze([]);

export default function useReactRouterTabs(
  props: Props = DEFAULT_PROPS,
): State {
  const { defaultActiveTabId, tabs = DEFAULT_TABS } = props;

  const history: History<unknown> = useHistory();

  const { hash, pathname, search } = useLocation();

  const ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
    null,
  );

  const findTabWithCurrentHref = ({ href }: TabsProps.Tab): boolean => {
    if (typeof href !== 'string') {
      return false;
    }
    const {
      hash: tabHash,
      pathname: tabPathname,
      search: tabSearch,
    }: URL = new URL(`https://localhost${href}`);
    return hash === tabHash && pathname === tabPathname && search === tabSearch;
  };

  const currentTab: TabsProps.Tab | undefined = tabs.find(
    findTabWithCurrentHref,
  );

  const handleChange = useCallback(
    (e: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void => {
      if (e.detail.activeTabHref) {
        history.push(e.detail.activeTabHref);
      }
    },
    [history],
  );

  const isCurrentTab: boolean = typeof currentTab !== 'undefined';
  useEffect((): void => {
    if (isCurrentTab && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [hash, isCurrentTab]);

  return {
    activeTabId: currentTab?.id || defaultActiveTabId,
    handleChange,
    ref,
  };
}
