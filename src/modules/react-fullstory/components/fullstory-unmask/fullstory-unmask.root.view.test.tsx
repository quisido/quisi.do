import { render } from '@testing-library/react';
import expect from 'expect';
import FullStoryUnmask from '.';

describe('FullStoryUnmask', (): void => {
  it('should render an element with class name `fs-unmask`', (): void => {
    const { getByText } = render(
      <FullStoryUnmask>Hello world</FullStoryUnmask>,
    );

    expect(getByText('Hello world').classList).toContain('fs-unmask');
  });
});
