import { RenderResult, act, renderHook } from '@testing-library/react-hooks';
import useProvider, { State } from './provider.hook';

const EN_US: 'en_US' = 'en_US';
const ES_ES: 'es_ES' = 'es_ES';

const asyncLoadFallbackTranslationsEffect = async (
  result: RenderResult<State>,
): Promise<void> => {
  await act(
    async (): Promise<void> => {
      await result.current.asyncLoadFallbackTranslationsEffect.current;
    },
  );
};

const asyncLoadTranslationsEffect = async (
  result: RenderResult<State>,
): Promise<void> => {
  await act(
    async (): Promise<void> => {
      await result.current.asyncLoadTranslationsEffect.current;
    },
  );
};

describe('useProvider', (): void => {
  it('should throw an error when the locale does not exist', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: EN_US,
        translationsRecord: {
          [EN_US]: undefined,
        },
      },
    });
    expect(result.error).toBeInstanceOf(Error);
  });

  it('should throw an error when the fallback locale does not exist', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        fallbackLocale: ES_ES,
        locale: EN_US,
        translationsRecord: {
          [EN_US]: {
            English: 'English',
          },
          [ES_ES]: undefined,
        },
      },
    });
    expect(result.error).toBeInstanceOf(Error);
  });

  it('should handle eager-loaded translations', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: ES_ES,
        translationsRecord: {
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    expect(result.current.translate('Spanish')).toBe('Espanol');
  });

  it('should handle eager-loaded fallback translations', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        fallbackLocale: EN_US,
        locale: ES_ES,
        translationsRecord: {
          [EN_US]: {
            English: 'English',
          },
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    expect(result.current.translate('English')).toBe('English');
  });

  it('should handle lazy-loaded translations', async (): Promise<void> => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: ES_ES,
        translationsRecord: {
          [ES_ES]: (): Promise<Record<string, string>> =>
            Promise.resolve({
              Spanish: 'Espanol',
            }),
        },
      },
    });
    expect(result.current.translate('Spanish')).toBeUndefined();
    await asyncLoadTranslationsEffect(result);
    expect(result.current.translate('Spanish')).toBe('Espanol');
  });

  it('should handle lazy-loaded fallback translations', async (): Promise<void> => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        fallbackLocale: EN_US,
        locale: ES_ES,
        translationsRecord: {
          [EN_US]: (): Promise<Record<string, string>> =>
            Promise.resolve({
              English: 'English',
            }),
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    expect(result.current.translate('English')).toBeUndefined();
    await asyncLoadFallbackTranslationsEffect(result);
    expect(result.current.translate('English')).toBe('English');
  });

  it('should throw an error if no translation or fallback locale exists', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: EN_US,
        translationsRecord: {
          [EN_US]: {
            English: 'English',
          },
        },
      },
    });
    expect((): void => {
      result.current.translate('Spanish');
    }).toThrowError();
  });

  it('should throw an error if no translation exists', (): void => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        fallbackLocale: EN_US,
        locale: ES_ES,
        translationsRecord: {
          [EN_US]: {
            English: 'English',
          },
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    expect((): void => {
      result.current.translate('German');
    }).toThrowError();
  });
});
