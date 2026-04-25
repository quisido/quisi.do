import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { TabPanel } from './index.js';

describe('TabPanel', (): void => {
  it('should be a tab panel', (): void => {
    const { getByRole } = render(
      <TabPanel label="Test tab panel">Test content</TabPanel>,
    );

    getByRole('tabpanel', { name: 'Test tab panel' });
  });
});
