import { Dropdown } from '@react95/core';
import type { FormEvent, ReactElement, ReactText } from 'react';
import { useCallback, useMemo } from 'react';
import type Props from './types/props';

export default function React95Select({
  disabled = false,
  // label,
  // labelDirection,
  onChange,
  options: optionsProp,
  value,
}: Readonly<Props>): ReactElement {
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (e: Readonly<FormEvent<Readonly<HTMLSelectElement>>>): void => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  const optionsState: ReactText[] = useMemo((): ReactText[] => {
    return optionsProp.map((option): ReactText => option.value);
  }, [optionsProp]);

  return (
    <Dropdown
      aria-disabled={disabled}
      defaultValue={value}
      onChange={handleChange}
      options={optionsState}
    />
  );
}
