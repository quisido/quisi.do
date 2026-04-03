import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Timer } from './index.js';

describe('Timer', (): void => {
  it('should be a timer', (): void => {
    const { getByRole } = render(<Timer label="Test timer">00:00</Timer>);

    getByRole('timer', { name: 'Test timer' });
  });
});
