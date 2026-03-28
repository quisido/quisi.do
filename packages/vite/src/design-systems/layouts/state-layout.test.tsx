import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider, StateLayout } from './index.js';

describe('StateLayout', (): void => {
  it('should render main, article, and status', (): void => {
    const { getByRole } = render(
      <Provider>
        <StateLayout label="Test state">Test message</StateLayout>
      </Provider>,
    );

    getByRole('main');
    getByRole('article', { name: 'Test state' });
    getByRole('status');
  });

  it('should support headings', (): void => {
    const { getByRole } = render(
      <Provider>
        <StateLayout heading="Page not found">Test message</StateLayout>
      </Provider>,
    );

    getByRole('article', { name: 'Page not found' });
  });
});
