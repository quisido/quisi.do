import type { ReactElement } from 'react';
import type { Tab, TabsProps } from '../core/tabs-props.js';
import classes from './tabs.module.scss';
import useTabs from '../core/use-tabs.js';

/**
 *   Tabs contain a tab list and tab panel.
 * @see {@link https://w3c.github.io/aria/#tablist | WAI-ARIA `tablist` role}
 */
export default function Tabs({
  orientation = 'horizontal',
  tabs,
}: TabsProps): ReactElement {
  const { idPrefix } = useTabs();

  return (
    <div className={classes['root']}>
      <div
        aria-orientation={orientation}
        className={classes['tab-list']}
        role="tablist"
      >
        {tabs.map(({ key, label }: Tab): ReactElement => {
          return (
            <div
              aria-controls={`${idPrefix}-panel-${key}`}
              id={`${idPrefix}-tab-${key}`}
              key={key}
              role="tab"
            >
              {label}
            </div>
          );
        })}
      </div>
      {tabs.map(
        ({ key, panel }: Tab): ReactElement => (
          <div
            aria-labelledby={`${idPrefix}-tab-${key}`}
            className={classes['tab-panel']}
            key={key}
            id={`${idPrefix}-panel-${key}`}
            role="tabpanel"
          >
            {panel}
          </div>
        ),
      )}
    </div>
  );
}
