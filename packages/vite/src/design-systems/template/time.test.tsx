import { describe, it } from 'vitest';
import { Time } from './index.js';
import { render } from '@testing-library/react';

describe('Time', (): void => {
  it('should be a time', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Time describedBy="test-id">2018-07-07</Time>
      </>,
    );
    getByRole('time', { description: 'Test description' });
  });
});
