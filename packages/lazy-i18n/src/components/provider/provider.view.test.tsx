import { render } from '@testing-library/react';
import type {
  ComponentType,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import Loading from '../../components/loading/index.js';
import LoadingComponentContext from '../../contexts/loading-component.js';
import TranslateFunctionContext from '../../contexts/translate-function.js';
import { I18nProvider } from '../../index.js';
import type TranslateFunctionType from '../../types/translate-function.js';
import type { Translations } from '../../types/translations.js';

const TEST_TRANSLATIONS: Record<string, Translations> = {
  es_ES: {
    cat: 'gato',
  },
};

describe('Provider', (): void => {
  it('should set the contexts to their default values', (): void => {
    const LoadingComponent: MutableRefObject<
      ComponentType<unknown> | undefined
    > = {
      current: undefined,
    };

    const translate: MutableRefObject<TranslateFunctionType | undefined> = {
      current: undefined,
    };

    function TestComponent(): null {
      LoadingComponent.current = useContext(LoadingComponentContext);
      translate.current = useContext(TranslateFunctionContext);
      return null;
    }

    render(<TestComponent />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <I18nProvider locale="es_ES" translations={TEST_TRANSLATIONS}>
            {children}
          </I18nProvider>
        );
      },
    });

    if (typeof translate.current === 'undefined') {
      throw new Error('Could not find translate function context.');
    }

    expect(LoadingComponent.current).toBe(Loading);
    expect(translate.current('cat')).toBe('gato');
  });

  it('should set the contexts to the user-specified props', (): void => {
    let LoadingComponent: ComponentType<unknown> | undefined = undefined;

    function TestComponent(): null {
      LoadingComponent = useContext(LoadingComponentContext);
      return null;
    }

    function TestLoadingComponent(): null {
      return null;
    }

    render(<TestComponent />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <I18nProvider
            LoadingComponent={TestLoadingComponent}
            locale="es_ES"
            translations={TEST_TRANSLATIONS}
          >
            {children}
          </I18nProvider>
        );
      },
    });

    expect(LoadingComponent).toBe(TestLoadingComponent);
  });
});
