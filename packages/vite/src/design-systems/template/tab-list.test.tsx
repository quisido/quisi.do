import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Tab, TabList } from './index.js';

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
