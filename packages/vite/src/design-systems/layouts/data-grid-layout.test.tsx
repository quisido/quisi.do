import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { DataGridLayout, Provider } from './index.js';

describe('DataGridLayout', (): void => {
  it('should render the main content area', (): void => {
    const { getByRole } = render(
      <Provider>
        <DataGridLayout label="Test data grid">Test table</DataGridLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test data grid' });
  });

  it('should render a toolbar for controls', (): void => {
    const { getByRole } = render(
      <Provider>
        <DataGridLayout filters="Test filters" label="Test data grid">
          Test table
        </DataGridLayout>
      </Provider>,
    );

    getByRole('toolbar', { name: 'Data controls' });
  });

  it('should render a pagination region', (): void => {
    const { getByRole } = render(
      <Provider>
        <DataGridLayout label="Test data grid" pagination="Test pagination">
          Test table
        </DataGridLayout>
      </Provider>,
    );

    getByRole('region', { name: 'Pagination' });
  });
});
