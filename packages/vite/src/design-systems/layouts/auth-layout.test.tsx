import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { AuthLayout, Provider } from './index.js';

describe('AuthLayout', (): void => {
  it('should render main and article with a label', (): void => {
    const { getByRole } = render(
      <Provider>
        <AuthLayout label="Test auth">Test form</AuthLayout>
      </Provider>,
    );

    getByRole('main');
    getByRole('article', { name: 'Test auth' });
  });

  it('should support headings', (): void => {
    const { getByRole } = render(
      <Provider>
        <AuthLayout heading="Sign in">Test form</AuthLayout>
      </Provider>,
    );

    getByRole('article', { name: 'Sign in' });
  });
});
