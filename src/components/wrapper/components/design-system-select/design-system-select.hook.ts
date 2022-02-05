import { useCallback } from 'react';
import DesignSystem from '../../../../constants/design-system';
import useDesignSystem from '../../../../hooks/use-design-system';
import filterByDesignSystem from '../../../../utils/filter-by-design-system';
import filterByUndefined from '../../../../utils/filter-by-undefined';

interface State {
  readonly designSystem: DesignSystem;
  readonly handleChange: (designSystem: string | undefined) => void;
}

export default function useWrapperDesignSystemSelect(): State {
  const [designSystem, setDesignSystem] = useDesignSystem();

  return {
    designSystem,

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
