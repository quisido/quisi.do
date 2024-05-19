import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Null from './null.js';

describe('Null', (): void => {
  it('should render nothing', (): void => {
    render(<Null />);
  });
});
