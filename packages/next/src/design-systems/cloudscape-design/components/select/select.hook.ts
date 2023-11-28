import { type SelectProps } from '@cloudscape-design/components/select';
import { useCallback, useMemo } from 'react';
import type SelectChangeEvent from '../../../../types/readonly-cloudscape-design-select-change-event';
import type SelectOption from '../../../../types/select-option';
import validateString from '../../../../utils/validate-string';
import styles from './select.module.scss';

interface Props {
  readonly labelDirection: 'column' | 'row' | undefined;
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
  readonly value: string | undefined;
}

interface State {
  readonly className: string | undefined;
  readonly handleChange: (event: SelectChangeEvent) => void;
  readonly selectedOption: Readonly<SelectProps.Option> | null;
}

const EMPTY = 0;

const labelDirectionRowClassName: string = validateString(
  styles.labelDirectionRow,
);

export default function useCloudscapeDesignSelect({
  labelDirection,
  onChange,
  options,
  value,
}: Props): State {
  return {
    className: useMemo((): string | undefined => {
      const classNames: string[] = [];

      if (labelDirection === 'row') {
        classNames.push(labelDirectionRowClassName);
      }

      if (classNames.length === EMPTY) {
        return;
      }

      return classNames.join(' ');
    }, [labelDirection]),

    handleChange: useCallback(
      (e: SelectChangeEvent) => {
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
