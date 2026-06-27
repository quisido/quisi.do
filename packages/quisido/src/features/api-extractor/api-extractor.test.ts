import { describe, expect, it } from 'vitest';
import {
  type ApiExtractorDependencies,
  runApiExtractor,
} from './api-extractor.js';

const PROJECT_FOLDER = '/project';
const SHARED_CONFIG_PATH = '/quisido/api-extractor.json';

const createDependencies = (
  overrides: Partial<ApiExtractorDependencies> = {},
): ApiExtractorDependencies => {
  return {
    cwd: (): string => PROJECT_FOLDER,
    fileExists: (): boolean => false,
    getPackageJson: (): Promise<Record<string, unknown>> => Promise.resolve({}),
    invoke: (): {
      readonly errorCount: number;
      readonly succeeded: boolean;
      readonly warningCount: number;
    } => ({
      errorCount: 0,
      succeeded: true,
      warningCount: 0,
    }),
    resolveSharedConfig: (): string => SHARED_CONFIG_PATH,
    ...overrides,
  };
};

describe('runApiExtractor', (): void => {
  it('should skip private packages', async (): Promise<void> => {
    const result = await runApiExtractor(
      createDependencies({
        getPackageJson: (): Promise<Record<string, unknown>> =>
          Promise.resolve({
            private: true,
          }),
        invoke: (): never => {
          throw new Error('API Extractor should not be invoked.');
        },
      }),
    );

    expect(result).toEqual({
      message: 'The package is private.',
      status: 'skipped',
    });
  });

  it('should use the shared config by default', async (): Promise<void> => {
    let invokedOptions: unknown;

    const result = await runApiExtractor(
      createDependencies({
        invoke: (
          options,
        ): {
          readonly errorCount: number;
          readonly succeeded: boolean;
          readonly warningCount: number;
        } => {
          invokedOptions = options;
          return {
            errorCount: 0,
            succeeded: true,
            warningCount: 0,
          };
        },
      }),
    );

    expect(invokedOptions).toEqual({
      configFilePath: SHARED_CONFIG_PATH,
      packageJsonFilePath: '/project/package.json',
      projectFolder: PROJECT_FOLDER,
    });
    expect(result).toEqual({ status: 'success' });
  });

  it('should use a package config when one exists', async (): Promise<void> => {
    let invokedOptions: unknown;

    await runApiExtractor(
      createDependencies({
        fileExists: (path: string): boolean =>
          path === '/project/config/api-extractor.json',
        invoke: (
          options,
        ): {
          readonly errorCount: number;
          readonly succeeded: boolean;
          readonly warningCount: number;
        } => {
          invokedOptions = options;
          return {
            errorCount: 0,
            succeeded: true,
            warningCount: 0,
          };
        },
      }),
    );

    expect(invokedOptions).toEqual({
      configFilePath: '/project/config/api-extractor.json',
      packageJsonFilePath: '/project/package.json',
      projectFolder: PROJECT_FOLDER,
    });
  });

  it('should report API Extractor failures', async (): Promise<void> => {
    const result = await runApiExtractor(
      createDependencies({
        invoke: () => ({
          errorCount: 2,
          succeeded: false,
          warningCount: 1,
        }),
      }),
    );

    expect(result).toEqual({
      context:
        'API Extractor found problems with the package public API declarations.',
      message: 'API Extractor completed with 2 errors and 1 warning.',
      status: 'failure',
    });
  });
});
