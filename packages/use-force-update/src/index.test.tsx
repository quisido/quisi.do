import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import validateDefined from '../test/validate-defined.js';
import useForceUpdate from './index.js';

const FIRST = 0;
const NONE = 0;
const ONCE = 1;
const SECOND = 1;
const THRICE = 3;
const TWICE = 2;

const forceUpdates: (() => void)[] = [];
const TestComponent = (): null => {
  forceUpdates.push(useForceUpdate());
  return null;
};

describe('forceUpdate', () => {
  beforeEach((): void => {
    forceUpdates.splice(FIRST, forceUpdates.length);
    render(<TestComponent />);
  });

  it('should accept no parameters', (): void => {
    const forceUpdate = validateDefined(forceUpdates[FIRST]);
    expect(forceUpdate.length).toBe(NONE);
  });

  it('should maintain the same reference', (): void => {
    const forceUpdate = validateDefined(forceUpdates[FIRST]);

    act((): void => {
      forceUpdate();
    });

    expect(forceUpdates[FIRST]).toBe(forceUpdates[SECOND]);
  });

  it('should update the component', (): void => {
    const forceUpdate = validateDefined(forceUpdates[FIRST]);
    expect(forceUpdates.length).toBe(ONCE);

    act((): void => {
      forceUpdate();
    });

    expect(forceUpdates.length).toBe(TWICE);
    const forceUpdate2 = validateDefined(forceUpdates[FIRST]);

    act((): void => {
      forceUpdate2();
    });

    expect(forceUpdates.length).toBe(THRICE);
  });
});
