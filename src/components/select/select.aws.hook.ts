import type { SelectProps } from '@awsui/components-react';
import { useCallback, useMemo } from 'react';
import type ReadonlySelectChangeEvent from '../../types/readonly-select-change-event';
import type Props from './types/props';

interface State {
  readonly handleChange: (event: ReadonlySelectChangeEvent) => void;
  readonly selectedOption: Readonly<SelectProps.Option> | null;
}

export default function useAwsSelect({
  onChange,
  options,
  value,
}: Readonly<Props>): State {
  return {
    handleChange: useCallback(
      (e: ReadonlySelectChangeEvent) => {
        onChange(e.detail.selectedOption.value);
      },
      [onChange],
    ),

    selectedOption: useMemo((): SelectProps.Option | null => {
      const findSelectedOption = (
        option: Readonly<SelectProps.Option>,
      ): boolean => option.value === value;
      return options.find(findSelectedOption) ?? null;
    }, [options, value]),
  };
}
