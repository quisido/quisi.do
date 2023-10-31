/// <reference types="jest" />
import { render } from '@testing-library/react';
import inner from '../../test-utils/inner.js';
import Loading from './index.js';

describe('Loading', (): void => {
  it('should render ...', (): void => {
    const { getByText } = render(<Loading />);
    getByText(inner('...'));
  });
});
