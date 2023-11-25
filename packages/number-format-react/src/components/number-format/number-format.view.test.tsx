/// <reference types="jest" />
import { render } from '@testing-library/react';
import NumberFormat from '../../index.js';

describe('NumberFormat', (): void => {
  it('should render numeric strings', (): void => {
    const { getByText } = render(<NumberFormat>21</NumberFormat>);
    getByText('21');
  });

  it('should render numbers', (): void => {
    const { getByText } = render(<NumberFormat>{21}</NumberFormat>);
    getByText('21');
  });
});
