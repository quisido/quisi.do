import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MasterDetailLayout, Provider } from './index.js';

describe('MasterDetailLayout', (): void => {
  it('should render navigation and main content', (): void => {
    const { getByRole } = render(
      <Provider>
        <MasterDetailLayout
          label="Test detail"
          master="Test master"
          masterLabel="Items"
        >
          Test detail content
        </MasterDetailLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test detail' });
    getByRole('navigation', { name: 'Items' });
  });
});
