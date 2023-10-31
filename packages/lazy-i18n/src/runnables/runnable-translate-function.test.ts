/// <reference types="jest" />
import RunnableTranslateFunction from './runnable-translate-function.js';

describe('RunnableTranslateFunction', (): void => {
  it('should emit loadTranslations when they have not loaded', (): void => {
    const MOCK_LOAD_TRANSLATIONS = jest.fn();
    const runnable: RunnableTranslateFunction = new RunnableTranslateFunction(
      {},
    );
    runnable.on('loadTranslations', MOCK_LOAD_TRANSLATIONS);
    expect(runnable.run('test')).toBeUndefined();
    expect(MOCK_LOAD_TRANSLATIONS).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_TRANSLATIONS).toHaveBeenLastCalledWith('test');
  });

  it('should translate when translations have loaded', (): void => {
    const runnable: RunnableTranslateFunction = new RunnableTranslateFunction({
      translations: {
        one: 'two',
      },
    });
    expect(runnable.run('one')).toBe('two');
  });

  it('should emit loadFallbackTranslations when they have not loaded', (): void => {
    const MOCK_LOAD_FALLBACK_TRANSLATIONS = jest.fn();
    const runnable: RunnableTranslateFunction = new RunnableTranslateFunction({
      translations: {
        one: 'two',
      },
    });
    runnable.on('loadFallbackTranslations', MOCK_LOAD_FALLBACK_TRANSLATIONS);
    expect(runnable.run('three')).toBeUndefined();
    expect(MOCK_LOAD_FALLBACK_TRANSLATIONS).toHaveBeenCalledTimes(1);
    expect(MOCK_LOAD_FALLBACK_TRANSLATIONS).toHaveBeenLastCalledWith('three');
  });

  it('should translate when fallback translations have loaded', (): void => {
    const runnable: RunnableTranslateFunction = new RunnableTranslateFunction({
      fallbackTranslations: {
        three: 'four',
      },
      translations: {
        one: 'two',
      },
    });
    expect(runnable.run('three')).toBe('four');
  });

  it('should emit notFound when no translations exist', (): void => {
    const MOCK_NOT_FOUND = jest.fn();
    const runnable: RunnableTranslateFunction = new RunnableTranslateFunction({
      fallbackTranslations: {
        three: 'four',
      },
      translations: {
        one: 'two',
      },
    });
    runnable.on('notFound', MOCK_NOT_FOUND);
    expect(runnable.run('five')).toBeUndefined();
    expect(MOCK_NOT_FOUND).toHaveBeenCalledTimes(1);
    expect(MOCK_NOT_FOUND).toHaveBeenLastCalledWith('five');
  });
});
