import { Checkbox } from '@react95/core';
import type { FormEvent, ReactElement } from 'react';
import { useCallback } from 'react';
import type Props from './types/props';

export default function React95Checkbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  const handleChange = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      e: Readonly<FormEvent<Readonly<HTMLInputElement>>>,
    ): void => {
      onChange(e.currentTarget.checked);
    },
    [onChange],
  );

  return (
    <>
      <Checkbox checked={checked} onChange={handleChange} />
      {children}
    </>
  );
}
