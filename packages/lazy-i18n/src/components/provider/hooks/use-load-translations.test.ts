import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import expectToEventuallyThrow from '../../../test/utils/expect-to-eventually-throw.js';
import noop from '../../../test/utils/noop.js';
import type { DefaultExport } from '../../../types/default-export.js';
import type { Translations } from '../../../types/translations.js';
import {
  default as useLoadTranslations,
  type Props,
  type State,
} from './use-load-translations.js';

type Locale = 'es_ES';
type T = Record<Locale, Translations | undefined>;
type P = Props<T>;
type S = State<keyof T>;

const ES_ES = 'es_ES';
const TEST_ERROR_MESSAGE = 'test error message';
const TEST_ERROR: Error = new Error(TEST_ERROR_MESSAGE);

describe('useLoadTranslations', (): void => {
  it('should not load a second time', async (): Promise<void> => {
    const MOCK_ES_ES = vi.fn().mockReturnValue({
      Spanish: 'Espanol',
    });

    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: noop,
        translationsRecord: {
          [ES_ES]: MOCK_ES_ES,
        },
      },
    });

    await result.current('es_ES');
    expect(MOCK_ES_ES).toHaveBeenCalledOnce();
    await result.current('es_ES');
    expect(MOCK_ES_ES).toHaveBeenCalledOnce();
  });

  it('should throw an error if the translations do not exist', async (): Promise<void> => {
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: noop,
        translationsRecord: {
          [ES_ES]: undefined,
        },
      },
    });

    await expect(async (): Promise<void> => {
      await result.current('es_ES');
    }).rejects.toThrow();
  });

  it('should load string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });

    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load default export string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
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

    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: (): Record<string, string> => ({
            Spanish: 'Espanol',
          }),
        },
      },
    });

    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load default imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
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

    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load dynamically imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: MOCK_LOAD_HANDLER,
        translationsRecord: {
          [ES_ES]: (): Promise<Record<string, string>> =>
            Promise.resolve({
              Spanish: 'Espanol',
            }),
        },
      },
    });

    await result.current('es_ES');
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should load dynamically default imported string record translations', async (): Promise<void> => {
    const MOCK_LOAD_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
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
    expect(MOCK_LOAD_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_HANDLER).toHaveBeenLastCalledWith('es_ES', {
      Spanish: 'Espanol',
    });
  });

  it('should throw load errors', async (): Promise<void> => {
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: noop,
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
    const MOCK_LOAD_ERROR_HANDLER = vi.fn();
    const { result } = renderHook<S, P>(useLoadTranslations, {
      initialProps: {
        onLoad: noop,
        onLoadError: MOCK_LOAD_ERROR_HANDLER,
        translationsRecord: {
          [ES_ES]: async (): Promise<Record<string, string>> =>
            Promise.reject(TEST_ERROR),
        },
      },
    });
    await result.current('es_ES');
    expect(MOCK_LOAD_ERROR_HANDLER).toHaveBeenCalledOnce();
    expect(MOCK_LOAD_ERROR_HANDLER).toHaveBeenLastCalledWith(ES_ES, TEST_ERROR);
  });
});
