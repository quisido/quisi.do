import type { SelectChangeEvent } from '@mui/material/Select';
import type { Attributes } from 'react';
import { useCallback, useMemo } from 'react';
import type SelectOption from '../../types/select-option';
import type MenuItemProps from './types/mui-menu-item-props';

interface Props {
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
}

interface State {
  readonly handleChange: (event: SelectChangeEvent<string | undefined>) => void;
  readonly menuItemProps: readonly (Required<Attributes> & MenuItemProps)[];
}

const mapOptionToProps = ({
  label,
  value,
}: Readonly<SelectOption>): Required<Attributes> & MenuItemProps => ({
  children: label,
  key: value,
  value,
});

export default function useMuiSelect({
  onChange,
  options,
}: Readonly<Props>): State {
  return {
    handleChange: useCallback(
      (e: Readonly<SelectChangeEvent<string | undefined>>) => {
        onChange(e.target.value);
      },
      [onChange],
    ),

    menuItemProps: useMemo((): readonly (Required<Attributes> &
      MenuItemProps)[] => {
      return options.map(mapOptionToProps);
    }, [options]),
  };
}
