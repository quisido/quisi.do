import { render } from '@testing-library/react';
import expect from 'expect';
import FullStoryExcludeWithoutConsent from '.';

describe('FullStoryExcludeWithoutConsent', (): void => {
  it('should render an element with class name `fs-exclude-without-consent`', (): void => {
    const { getByText } = render(
      <FullStoryExcludeWithoutConsent>
        Hello world
      </FullStoryExcludeWithoutConsent>,
    );

    expect(getByText('Hello world').classList).toContain(
      'fs-exclude-without-consent',
    );
  });
});
