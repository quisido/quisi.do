import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useCallback } from 'react';
import DesignSystem, {
  isDesignSystem,
} from '../../../../constants/design-system';
import useDesignSystem from '../../../../hooks/use-design-system';

interface State {
  readonly designSystem: DesignSystem;
  readonly handleChange: (designSystem: string | undefined) => void;
  readonly label: string | undefined;
}

export default function useSettingsDesignSystemSelect(): State {
  // Contexts
  const [designSystem, setDesignSystem] = useDesignSystem();
  const translate: TranslateFunction = useTranslate();

  return {
    designSystem,
    label: translate('Design system'),

    handleChange: useCallback(
      (newDesignSystem: string | undefined): void => {
        if (typeof newDesignSystem === 'undefined') {
          setDesignSystem(DesignSystem.Quisi);
          return;
        }

        if (!isDesignSystem(newDesignSystem)) {
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
