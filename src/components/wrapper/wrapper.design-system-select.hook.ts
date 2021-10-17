import { useCallback } from 'react';
import DesignSystem from '../../constants/design-system';
import useDesignSystem from '../../hooks/use-design-system';
import useSetDesignSystem from '../../hooks/use-set-design-system';
import filterByDesignSystem from '../../utils/filter-by-design-system';

interface State {
  readonly designSystem: DesignSystem;
  readonly handleChange: (designSystem: string | undefined) => void;
}

export default function useWrapperDesignSystemSelect(): State {
  const designSystem: DesignSystem = useDesignSystem();
  const setDesignSystem = useSetDesignSystem();

  return {
    designSystem,

    handleChange: useCallback(
      (newDesignSystem: string | undefined): void => {
        if (typeof newDesignSystem === 'undefined') {
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
