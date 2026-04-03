import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Tab, TabList } from './index.js';

describe('Tab', (): void => {
  it('should be a tab', (): void => {
    const { getByRole } = render(
      <TabList label="Test tab list">
        <Tab>Test tab</Tab>
      </TabList>,
    );

    getByRole('tab', { name: 'Test tab' });
  });
});
