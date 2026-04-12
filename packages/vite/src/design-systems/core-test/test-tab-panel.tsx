import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TabPanelProps } from '../core/tab-panel-props.js';

export default function testTabPanel(
  TabPanel: ComponentType<TabPanelProps>,
): void {
  describe('TabPanel', (): void => {
    it('should be a tab panel', (): void => {
      const { getByName } = render(
        <TabPanel label="Test tab panel">Test content</TabPanel>,
      );

      getByName('tabpanel', 'Test tab panel');
    });
  });
}
