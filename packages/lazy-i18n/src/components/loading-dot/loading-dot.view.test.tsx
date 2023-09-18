import { render } from '@testing-library/react';
import LoadingDot from '.';

describe('LoadingDot', (): void => {
  it('should render a .', (): void => {
    const { getByText } = render(<LoadingDot index={0} />);
    getByText('.');
  });
});
