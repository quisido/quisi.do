import { describe, it } from 'vitest';
import { Meter } from './index.js';
import { render } from '@testing-library/react';

describe('Meter', (): void => {
  it('should support internal labels', (): void => {
    const { getByRole } = render(<Meter label="Test label" value={1} />);
    getByRole(`meter`, { name: 'Test label' });
  });

  it('should support external labels', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test label</span>
        <Meter labelledBy="test-id" value={1} />
      </>,
    );
    getByRole(`meter`, { name: 'Test label' });
  });

  it('should support values', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test label</span>
        <Meter labelledBy="test-id" value={1} />
      </>,
    );
    getByRole(`meter`, { value: { now: 1 } });
  });
});
