const TEST_INIT = jest.fn();
jest.mock('@fullstory/browser', () => ({
  init: TEST_INIT,
}));

import { renderHook } from '@testing-library/react-hooks';
import expect from 'expect';
import useFullStory from './fullstory.root.hook';

const ONCE = 1;

describe('useFullStory', (): void => {
  it('should init', (): void => {
    renderHook(useFullStory, {
      initialProps: {
        debug: true,
        devMode: true,
        host: 'test-host',
        namespace: 'test-namespace',
        orgId: 'test-org-id',
        recordCrossDomainIFrames: true,
        recordOnlyThisIFrame: true,
        script: 'test-script',
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      debug: true,
      devMode: true,
      host: 'test-host',
      namespace: 'test-namespace',
      orgId: 'test-org-id',
      recordCrossDomainIFrames: true,
      recordOnlyThisIFrame: true,
      script: 'test-script',
    });
  });
});
