import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TabListProps } from '../core/tab-list-props.js';
import type { TabProps } from '../core/tab-props.js';

interface Options {
  readonly Tab: ComponentType<TabProps>;
}

export default function testTabList(
  TabList: ComponentType<TabListProps>,
  { Tab }: Options,
): void {
  describe('TabList', (): void => {
    it('should be a tab list', (): void => {
      const { getByRole } = render(
        <TabList label="Test tab list">
          <Tab>Test tab</Tab>
        </TabList>,
      );

      getByRole('tablist', { name: 'Test tab list' });
    });
  });
}
