import { type SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useId, useMemo } from 'react';
import type SelectOption from '../../../../types/select-option.js';
import type { WithKey } from '../../../../types/with-key.js';
import type MenuItemProps from './types/menu-item-props.js';

interface Props {
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
}

interface State {
  readonly handleChange: (event: SelectChangeEvent<string | undefined>) => void;
  readonly id: string;
  readonly menuItemProps: readonly WithKey<MenuItemProps>[];
}

const mapOptionToProps = ({
  label,
  value,
}: Readonly<SelectOption>): WithKey<MenuItemProps> => ({
  children: label,
  key: value,
  value,
});

export default function useMuiSelect({ onChange, options }: Props): State {
  return {
    id: useId(),

    handleChange: useCallback(
      (e: Readonly<SelectChangeEvent<string | undefined>>) => {
        onChange(e.target.value);
      },
      [onChange],
    ),

    menuItemProps: useMemo((): readonly WithKey<MenuItemProps>[] => {
      return options.map(mapOptionToProps);
    }, [options]),
  };
}
