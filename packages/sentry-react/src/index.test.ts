import { Profiler, useProfiler, withProfiler } from '.';

describe('sentry-react', (): void => {
  it('should re-export', (): void => {
    expect(Profiler).toBeDefined();
    expect(useProfiler).toBeDefined();
    expect(withProfiler).toBeDefined();
  });
});
