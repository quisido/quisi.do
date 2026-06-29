import type { Key, ReactNode } from 'react';

interface Props<T extends string | number = string | number> {
  readonly children?: ReactNode | undefined;
  readonly onChange: (value: T) => void;
  readonly owns?: readonly string[] | ReadonlySet<string> | string | undefined;
  readonly radios: readonly Radio<T>[];
  readonly readOnly?: boolean | undefined;
  readonly required?: boolean | undefined;
  readonly value?: T | null | undefined;
}

interface LabelProps {
  readonly label: string;
  readonly labelledBy?: undefined;
}

interface LabelledByProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}

export interface Radio<T extends string | number = string | number> {
  readonly key: Key;
  readonly label: string;
  readonly positionInSet?: number | undefined;
  readonly value: T;
}

export type RadioGroupProps<T extends string | number = string | number> = (
  LabelProps | LabelledByProps
) &
  Props<T>;
