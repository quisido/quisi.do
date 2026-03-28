import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider, WizardLayout } from './index.js';

describe('WizardLayout', (): void => {
  it('should render main, form, and progress bar', (): void => {
    const { getByRole } = render(
      <Provider>
        <WizardLayout currentStep={1} label="Test wizard" totalSteps={3}>
          Step content
        </WizardLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test wizard' });
    getByRole('form', { name: 'Test wizard' });
    getByRole('progressbar', { name: 'Step 1 of 3' });
    getByRole('group', { name: 'Step 1' });
  });

  it('should reflect the current step', (): void => {
    const { getByRole } = render(
      <Provider>
        <WizardLayout currentStep={3} label="Checkout" totalSteps={5}>
          Step content
        </WizardLayout>
      </Provider>,
    );

    getByRole('progressbar', { name: 'Step 3 of 5' });
    getByRole('group', { name: 'Step 3' });
  });
});
