import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { DashboardLayout, Provider } from './index.js';

describe('DashboardLayout', (): void => {
  it('should render navigation and main content', (): void => {
    const { getByRole } = render(
      <Provider>
        <DashboardLayout
          label="Test dashboard"
          navigation="Test navigation"
          navigationLabel="Sidebar"
        >
          Test content
        </DashboardLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test dashboard' });
    getByRole('navigation', { name: 'Sidebar' });
  });

  it('should render a banner', (): void => {
    const { getByRole } = render(
      <Provider>
        <DashboardLayout
          banner="Test banner"
          label="Dashboard with banner"
          navigation="Test navigation"
          navigationLabel="Dashboard navigation"
        >
          Test content
        </DashboardLayout>
      </Provider>,
    );

    getByRole('banner');
  });
});
