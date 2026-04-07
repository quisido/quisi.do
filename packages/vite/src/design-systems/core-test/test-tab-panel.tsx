import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TabPanelProps } from '../core/tab-panel-props.js';

export default function testTabPanel(
  TabPanel: ComponentType<TabPanelProps>,
): void {
  describe('TabPanel', (): void => {
    it('should be a tab panel', (): void => {
      const { getByRole } = render(
        <TabPanel label="Test tab panel">Test content</TabPanel>,
      );

      getByRole('tabpanel', { name: 'Test tab panel' });
    });
  });
}
