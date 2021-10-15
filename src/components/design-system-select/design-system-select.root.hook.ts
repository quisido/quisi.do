import type { SelectProps } from '@awsui/components-react/select';
import { useCallback, useMemo } from 'react';
import type DesignSystem from '../../constants/design-system';
import DESIGN_SYSTEM_OPTIONS from '../../constants/design-system-options';
import useDesignSystem from '../../hooks/use-design-system';
import useSetDesignSystem from '../../hooks/use-set-design-system';
import type ReadonlySelectChangeEvent from '../../types/readonly-select-change-event';

interface State {
  selectedOption: SelectProps.Option;
  readonly handleChange: (event: ReadonlySelectChangeEvent) => void;
}

export default function useDesignSystemSelect(): State {
  const designSystem: DesignSystem = useDesignSystem();
  const setDesignSystem = useSetDesignSystem();

  return {
    handleChange: useCallback(
      (e: ReadonlySelectChangeEvent): void => {
        // We can assert the type to be a `DesignSystem` enum value, because we
        //   only set the select values to be `DesignSystem` enum values.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        setDesignSystem(e.detail.selectedOption.value as DesignSystem);
      },
      [setDesignSystem],
    ),

    selectedOption: useMemo((): SelectProps.Option => {
      const findSelectedOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === designSystem;
      // Since `language` is a Language enum value and all Language enum values
      //   have a corresponding option, we can assert that an option was found.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return DESIGN_SYSTEM_OPTIONS.find(findSelectedOption)!;
    }, [designSystem]),
  };
}
