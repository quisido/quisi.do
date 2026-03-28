import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { LandingLayout, Provider } from './index.js';

describe('LandingLayout', (): void => {
  it('should render the main content area with a hero region', (): void => {
    const { getByRole } = render(
      <Provider>
        <LandingLayout hero="Test hero" label="Test landing">
          Test features
        </LandingLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test landing' });
    getByRole('region', { name: 'Hero' });
  });

  it('should render a call-to-action region', (): void => {
    const { getByRole } = render(
      <Provider>
        <LandingLayout
          callToAction="Test CTA"
          hero="Test hero"
          label="Test landing with CTA"
        >
          Test features
        </LandingLayout>
      </Provider>,
    );

    getByRole('region', { name: 'Call to action' });
  });
});
