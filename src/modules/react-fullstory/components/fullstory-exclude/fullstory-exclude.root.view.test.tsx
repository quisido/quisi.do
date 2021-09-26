import { render } from '@testing-library/react';
import expect from 'expect';
import FullStoryExclude from '.';

describe('FullStoryExclude', (): void => {
  it('should render an element with class name `fs-exclude`', (): void => {
    const { getByText } = render(
      <FullStoryExclude>Hello world</FullStoryExclude>,
    );

    expect(getByText('Hello world').classList).toContain('fs-exclude');
  });
});
