import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ContactLayout, Provider } from './index.js';

describe('ContactLayout', (): void => {
  it('should render main and complementary content', (): void => {
    const { getByRole } = render(
      <Provider>
        <ContactLayout info="Test info" label="Test contact">
          Test form
        </ContactLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test contact' });
    getByRole('complementary');
  });
});
