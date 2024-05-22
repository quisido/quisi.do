import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import LoadingDot from './index.js';

describe('LoadingDot', (): void => {
  it('should render a .', (): void => {
    const { getByText } = render(<LoadingDot index={0} />);
    getByText('.');
  });
});
