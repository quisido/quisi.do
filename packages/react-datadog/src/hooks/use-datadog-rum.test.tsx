/// <reference types="jest" />
import { datadogRum } from '@datadog/browser-rum';
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useDatadogRum } from '../index.js';
import DatadogRumContext from '../contexts/datadog-rum.js';

describe('useDatadogRum', (): void => {
  it('should return a provided RUM client', (): void => {
    const testRum: typeof datadogRum = {} as typeof datadogRum;

    const { result } = renderHook(useDatadogRum, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <DatadogRumContext.Provider value={testRum}>
            {children}
          </DatadogRumContext.Provider>
        );
      },
    });

    expect(result.current).toBe(testRum);
  });

  it('should default to the vended DataDog RUM client', (): void => {
    const { result } = renderHook(useDatadogRum);
    expect(result.current).toBe(datadogRum);
  });
});
