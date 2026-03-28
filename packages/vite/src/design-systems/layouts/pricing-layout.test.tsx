import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { PricingLayout, Provider } from './index.js';

describe('PricingLayout', (): void => {
  it('should render the main content area', (): void => {
    const { getByRole } = render(
      <Provider>
        <PricingLayout label="Test pricing">Test tiers</PricingLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test pricing' });
  });

  it('should render a header region', (): void => {
    const { getByRole } = render(
      <Provider>
        <PricingLayout header="Test header" label="Test pricing">
          Test tiers
        </PricingLayout>
      </Provider>,
    );

    getByRole('region', { name: 'Overview' });
  });

  it('should render a FAQ region', (): void => {
    const { getByRole } = render(
      <Provider>
        <PricingLayout faq="Test FAQ" label="Test pricing">
          Test tiers
        </PricingLayout>
      </Provider>,
    );

    getByRole('region', { name: 'Frequently asked questions' });
  });
});
