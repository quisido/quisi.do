import {
  type KeyboardEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Tab, TabsProps } from '../core/tabs-props.js';
import classes from './tabs.module.scss';
import useTabs from '../core/use-tabs.js';

type TabKey = Tab['key'];

const getSelectedKey = (tabs: readonly Tab[]): TabKey | undefined => {
  return tabs.find(({ active }: Tab): boolean => active)?.key ?? tabs[0]?.key;
};

const getTabIndex = (isSelected: boolean): -1 | 0 => {
  if (isSelected) {
    return 0;
  }

  return -1;
};

const getTabAtOffset = (
  tabs: readonly Tab[],
  index: number,
  offset: number,
): Tab | undefined => {
  if (tabs.length === 0) {
    return;
  }

  const nextIndex: number = (index + offset + tabs.length) % tabs.length;
  return tabs[nextIndex];
};

/**
 * Tabs contain a tab list and tab panel.
 * @see {@link https://w3c.github.io/aria/#tablist | WAI-ARIA `tablist` role}
 */
export default function Tabs({
  label,
  labelledBy: labelledByProp,
  orientation = 'horizontal',
  tabs,
}: TabsProps): ReactElement {
  const { idPrefix } = useTabs();
  const labelId: string = `${idPrefix}-label`;
  const labelledBy: string = labelledByProp ?? labelId;
  const tabRefs = useRef(new Map<TabKey, HTMLButtonElement>());
  const [selectedKey, setSelectedKey] = useState<TabKey | undefined>(
    getSelectedKey(tabs),
  );

  useEffect((): void => {
    setSelectedKey(getSelectedKey(tabs));
  }, [tabs]);

  const selectTab = (key: TabKey): void => {
    setSelectedKey(key);
  };

  const focusAndSelectTab = (key: TabKey): void => {
    selectTab(key);
    tabRefs.current.get(key)?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    key: TabKey,
  ): void => {
    switch (event.key) {
      case ' ': {
        event.preventDefault();
        selectTab(key);
        break;
      }

      case 'ArrowDown': {
        if (orientation === 'vertical') {
          event.preventDefault();
          const nextTab: Tab | undefined = getTabAtOffset(tabs, index, 1);
          if (nextTab !== undefined) {
            focusAndSelectTab(nextTab.key);
          }
        }
        break;
      }

      case 'ArrowLeft': {
        if (orientation === 'horizontal') {
          event.preventDefault();
          const previousTab: Tab | undefined = getTabAtOffset(tabs, index, -1);
          if (previousTab !== undefined) {
            focusAndSelectTab(previousTab.key);
          }
        }
        break;
      }

      case 'ArrowRight': {
        if (orientation === 'horizontal') {
          event.preventDefault();
          const nextTab: Tab | undefined = getTabAtOffset(tabs, index, 1);
          if (nextTab !== undefined) {
            focusAndSelectTab(nextTab.key);
          }
        }
        break;
      }

      case 'ArrowUp': {
        if (orientation === 'vertical') {
          event.preventDefault();
          const previousTab: Tab | undefined = getTabAtOffset(tabs, index, -1);
          if (previousTab !== undefined) {
            focusAndSelectTab(previousTab.key);
          }
        }
        break;
      }

      case 'End': {
        const lastTab: Tab | undefined = tabs[tabs.length - 1];
        if (lastTab !== undefined) {
          event.preventDefault();
          focusAndSelectTab(lastTab.key);
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        selectTab(key);
        break;
      }

      case 'Home': {
        const firstTab: Tab | undefined = tabs[0];
        if (firstTab !== undefined) {
          event.preventDefault();
          focusAndSelectTab(firstTab.key);
        }
        break;
      }
    }
  };

  return (
    <div className={classes['root']}>
      {label && <span id={labelId}>{label}</span>}
      <div
        aria-labelledby={labelledBy}
        aria-orientation={orientation}
        className={classes['tab-list']}
        role="tablist"
      >
        {tabs.map(({ key, label }: Tab, index: number): ReactElement => {
          const isSelected: boolean = key === selectedKey;

          return (
            <button
              aria-controls={`${idPrefix}-panel-${key}`}
              aria-selected={isSelected}
              className={classes['tab']}
              id={`${idPrefix}-tab-${key}`}
              key={key}
              onClick={(): void => {
                selectTab(key);
              }}
              onKeyDown={(event: KeyboardEvent<HTMLButtonElement>): void => {
                handleKeyDown(event, index, key);
              }}
              ref={(element: HTMLButtonElement | null): void => {
                if (element === null) {
                  tabRefs.current.delete(key);
                  return;
                }

                tabRefs.current.set(key, element);
              }}
              role="tab"
              tabIndex={getTabIndex(isSelected)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>
      {tabs.map(({ key, panel }: Tab): ReactElement => {
        const isSelected: boolean = key === selectedKey;

        return (
          <div
            aria-labelledby={`${idPrefix}-tab-${key}`}
            className={classes['tab-panel']}
            hidden={!isSelected}
            id={`${idPrefix}-panel-${key}`}
            key={key}
            role="tabpanel"
            tabIndex={getTabIndex(isSelected)}
          >
            {panel}
          </div>
        );
      })}
    </div>
  );
}
