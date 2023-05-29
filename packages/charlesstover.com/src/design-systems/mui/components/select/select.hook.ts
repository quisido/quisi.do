import type { SelectChangeEvent } from '@mui/material/Select';
import type { Attributes } from 'react';
import { useCallback, useId, useMemo } from 'react';
import type SelectOption from '../../../../types/select-option';
import type MenuItemProps from './types/menu-item-props';

interface Props {
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
}

interface State {
  readonly handleChange: (event: SelectChangeEvent<string | undefined>) => void;
  readonly id: string;
  readonly menuItemProps: readonly (MenuItemProps & Required<Attributes>)[];
}

const mapOptionToProps = ({
  label,
  value,
}: Readonly<SelectOption>): MenuItemProps & Required<Attributes> => ({
  children: label,
  key: value,
  value,
});

export default function useMuiSelect({
  onChange,
  options,
}: Readonly<Props>): State {
  return {
    id: useId(),

    handleChange: useCallback(
      (e: Readonly<SelectChangeEvent<string | undefined>>) => {
        onChange(e.target.value);
      },
      [onChange],
    ),

    menuItemProps: useMemo((): readonly (MenuItemProps &
      Required<Attributes>)[] => {
      return options.map(mapOptionToProps);
    }, [options]),
  };
}
