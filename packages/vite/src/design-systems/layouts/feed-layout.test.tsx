import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { FeedLayout, Provider } from './index.js';

describe('FeedLayout', (): void => {
  it('should render the main content area', (): void => {
    const { getByRole } = render(
      <Provider>
        <FeedLayout label="Test feed">Test feed content</FeedLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test feed' });
  });

  it('should render a toolbar for filters', (): void => {
    const { getByRole } = render(
      <Provider>
        <FeedLayout filters="Test filters" label="Test feed">
          Test feed content
        </FeedLayout>
      </Provider>,
    );

    getByRole('toolbar', { name: 'Feed controls' });
  });
});
