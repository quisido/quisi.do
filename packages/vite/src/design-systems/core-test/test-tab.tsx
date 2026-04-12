import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TabListProps } from '../core/tab-list-props.js';
import type { TabProps } from '../core/tab-props.js';

interface Options {
  readonly TabList: ComponentType<TabListProps>;
}

export default function testTab(
  Tab: ComponentType<TabProps>,
  { TabList }: Options,
): void {
  describe('Tab', (): void => {
    it('should be a tab', (): void => {
      const { getByName } = render(
        <TabList label="Test tab list">
          <Tab>Test tab</Tab>
        </TabList>,
      );

      getByName('tab', 'Test tab');
    });
  });
}
