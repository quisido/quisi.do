import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { TabPanelProps } from '../core/tab-panel-props.js';

export default function testTabPanel(
  TabPanel: ComponentType<TabPanelProps>,
): void {
  describe('TabPanel', (): void => {
    it('should be a tab panel', (): void => {
      const { getByRole } = render(<TabPanel>Test content</TabPanel>);

      expect(getByRole('tabpanel')).toHaveTextContent('Test content');
    });
  });
}
