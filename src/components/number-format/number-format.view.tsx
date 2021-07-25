import type { ReactElement } from 'react';
import NumberFormat from 'number-format-react';
import useNumberFormat from './number-format.hook';

interface Props {
  readonly children: number;
}

export default function CustomNumberFormat({ children }: Props): ReactElement {
  const { locale } = useNumberFormat();

  return <NumberFormat locale={locale}>{children}</NumberFormat>;
}
