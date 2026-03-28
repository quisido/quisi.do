import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Application, Banner } from './index.js';

describe('Application', (): void => {
  it('should be an application', (): void => {
    const { getByRole } = render(
      <Application label="Test application">Test content</Application>,
    );

    getByRole('application', { name: 'Test application' });
  });

  it('should render a banner', (): void => {
    const { getByRole } = render(
      <Application banner="Test banner">Test content</Application>,
    );

    expect(getByRole('banner').textContent).toBe('Test banner');
  });

  it('should not contain more than 1 banner', (): void => {
    expect((): void => {
      render(
        <Application banner="First banner">
          <Banner>Second banner</Banner>
        </Application>,
      );
    }).toThrow('An application or document cannot own more than one banner.');
  });
});
