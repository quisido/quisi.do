import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import DesignSystem from '../../../../constants/design-system';
import useDesignSystem from '../../../../hooks/use-design-system';
import filterByDesignSystem from '../../../../utils/filter-by-design-system';
import filterByUndefined from '../../../../utils/filter-by-undefined';

interface State {
  readonly designSystem: DesignSystem;
  readonly disabled: boolean;
  readonly handleChange: (designSystem: string | undefined) => void;
  readonly label: string | undefined;
}

export default function useWrapperDesignSystemSelect(): State {
  // Contexts
  const [designSystem, setDesignSystem] = useDesignSystem();
  const { pathname } = useLocation();
  const translate: TranslateFunction = useTranslate();

  return {
    designSystem,

    // Technical debt: The "Spritesheet 2 GIF" route only supports AWS UI.
    disabled: pathname === '/spritesheet2gif',
    label: translate('Design system'),

    handleChange: useCallback(
      (newDesignSystem: string | undefined): void => {
        if (filterByUndefined(newDesignSystem)) {
          setDesignSystem(DesignSystem.Aws);
          return;
        }

        if (!filterByDesignSystem(newDesignSystem)) {
          throw new Error(
            `Expected a design system, but received: ${newDesignSystem}`,
          );
        }

        setDesignSystem(newDesignSystem);
      },
      [setDesignSystem],
    ),
  };
}
