/// <reference types="jest" />
import { render } from '@testing-library/react';
import Null from './null.js';

describe('Null', (): void => {
  it('should render nothing', (): void => {
    render(<Null />);
  });
});
