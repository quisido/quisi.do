import NumberFormat from 'number-format-react';
import { type ReactElement } from 'react';
import type Locale from '../constants/locale.js';
import { useLocale } from '../contexts/locale.js';

interface Props {
  readonly children: number;
}

interface State {
  readonly locale: Locale;
}

function useNumberFormat(): State {
  const [locale] = useLocale();

  return {
    locale,
  };
}

export default function CustomNumberFormat({ children }: Props): ReactElement {
  const { locale } = useNumberFormat();

  return <NumberFormat locale={locale}>{children}</NumberFormat>;
}
