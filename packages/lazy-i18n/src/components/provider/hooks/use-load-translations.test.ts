import { renderHook } from '@testing-library/react';
import expectToEventuallyThrow from '../../../test-utils/expect-to-eventually-throw.js';
import type { DefaultExport } from '../../../types/default-export.js';
import type { Translations } from '../../../types/translations.js';
import type { Props, State } from './use-load-translations.js';
import useLoadTranslations from './use-load-translations.js';

type Locale = 'es_ES';
type P = Props<T>;
type S = State<keyof T>;
type T = Record<Locale, Translations | undefined>;

const ES_ES: 'es_ES' = 'es_ES';
const TEST_ERROR_MESSAGE = 'test error message';
const TEST_ERROR: Error = new Error(TEST_ERROR_MESSAGE);

describe('useLoadTranslations', (): void => {
  it('should not load a second time', async (): Promise<void> => {
    const MOCK_ES_ES = jest.fn().mockReturnValue({
      Spanish: 'Espanol',
    });
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad(): void {},
        translationsRecord: {
          [ES_ES]: MOCK_ES_ES,
        },
      },
    });
    result.current('es_ES');
    expect(MOCK_ES_ES).toHaveBeenCalledTimes(1);
    result.current('es_ES');
    expect(MOCK_ES_ES).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the translations do not exist', (): void => {
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad(): void {},
        translationsRecord: {
          [ES_ES]: undefined,
        },
      },
    });
    expect((): void => {
      result.current('es_ES');
    }).toThrowError();
  });

  it('should load string record translations', (): void => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load default export string record translations', (): void => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: {
            default: {
              Spanish: 'Espanol',
            },
          },
        },
      },
    });
    result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load imported string record translations', (): void => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: (): Record<string, string> => ({
            Spanish: 'Espanol',
          }),
        },
      },
    });
    result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load default imported string record translations', (): void => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: (): DefaultExport<Record<string, string>> => ({
            default: {
              Spanish: 'Espanol',
            },
          }),
        },
      },
    });
    result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load dynamically imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: async (): Promise<Record<string, string>> =>
            Promise.resolve({
              Spanish: 'Espanol',
            }),
        },
      },
    });
    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load dynamically default imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: async (): Promise<DefaultExport<Record<string, string>>> =>
            Promise.resolve({
              default: {
                Spanish: 'Espanol',
              },
            }),
        },
      },
    });
    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should throw load errors', async (): Promise<void> => {
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad(): void {},
        translationsRecord: {
          [ES_ES]: async (): Promise<Record<string, string>> =>
            Promise.reject(TEST_ERROR),
        },
      },
    });
    await expectToEventuallyThrow(async (): Promise<void> => {
      await result.current('es_ES');
    }, TEST_ERROR);
  });

  it('should emit load errors', async (): Promise<void> => {
    const MOCK_LOAD_ERROR_HANDLER = jest.fn();
    const { result } = renderHook<P, S>(useLoadTranslations, {
      initialProps: {
        onLoad(): void {},
        onLoadError: MOCK_LOAD_ERROR_HANDLER,
        translationsRecord: {
          [ES_ES]: async (): Promise<Record<string, string>> =>
            Promise.reject(TEST_ERROR),
        },
      },
    });
    await result.current('es_ES');
    expect(MOCK_LOAD_ERROR_HANDLER).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_ERROR_HANDLER).toHaveBeenLastCalledWith(ES_ES, TEST_ERROR);
  });
});
