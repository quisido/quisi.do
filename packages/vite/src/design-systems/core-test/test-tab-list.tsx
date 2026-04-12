import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TabListProps } from '../core/tab-list-props.js';
import type { TabProps } from '../core/tab-props.js';
import render from './render.js';

interface Options {
  readonly Tab: ComponentType<TabProps>;
}

export default function testTabList(
  TabList: ComponentType<TabListProps>,
  { Tab }: Options,
): void {
  describe('TabList', (): void => {
    it('should be a tab list', (): void => {
      const { getByName } = render(
        <TabList label="Test tab list">
          <Tab>Test tab</Tab>
        </TabList>,
      );

      getByName('tablist', 'Test tab list');
    });
  });

  /**
   * TODO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */
}
