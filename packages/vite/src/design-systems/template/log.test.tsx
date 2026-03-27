import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Log } from './index.js';

describe('Log', (): void => {
  it('should be a log', (): void => {
    const { getByRole } = render(<Log label="Test log">Test content</Log>);

    getByRole('log', { name: 'Test log' });
  });
});
