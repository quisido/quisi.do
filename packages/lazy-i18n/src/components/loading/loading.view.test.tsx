import { render } from '@testing-library/react';
import inner from '../../test-utils/inner';
import Loading from '.';

describe('Loading', (): void => {
  it('should render ...', (): void => {
    const { getByText } = render(<Loading />);
    getByText(inner('...'));
  });
});
