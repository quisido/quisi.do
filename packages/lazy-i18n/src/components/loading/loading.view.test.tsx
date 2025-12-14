import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import inner from '../../../test/inner.js';
import Loading from './index.js';

describe('Loading', (): void => {
  it('should render ...', (): void => {
    const { getByText } = render(<Loading />);
    getByText(inner('...'));
  });
});
