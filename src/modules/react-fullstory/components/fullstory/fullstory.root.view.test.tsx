const TEST_INIT = jest.fn();
jest.mock('@fullstory/browser', () => ({
  init: TEST_INIT,
}));

import { render } from '@testing-library/react';
import FullStory from '../..';

describe('FullStory', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <FullStory orgId="test-org-id">Hello world</FullStory>,
    );
    getByText('Hello world');
  });
});
