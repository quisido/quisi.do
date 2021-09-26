import { render } from '@testing-library/react';
import expect from 'expect';
import FullStoryMaskWithoutConsent from '.';

describe('FullStoryMaskWithoutConsent', (): void => {
  it('should render an element with class name `fs-mask-without-consent`', (): void => {
    const { getByText } = render(
      <FullStoryMaskWithoutConsent>Hello world</FullStoryMaskWithoutConsent>,
    );

    expect(getByText('Hello world').classList).toContain(
      'fs-mask-without-consent',
    );
  });
});
