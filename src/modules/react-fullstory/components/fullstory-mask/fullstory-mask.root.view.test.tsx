import { render } from '@testing-library/react';
import expect from 'expect';
import FullStoryMask from '.';

describe('FullStoryMask', (): void => {
  it('should render an element with class name `fs-mask`', (): void => {
    const { getByText } = render(<FullStoryMask>Hello world</FullStoryMask>);

    expect(getByText('Hello world').classList).toContain('fs-mask');
  });
});
