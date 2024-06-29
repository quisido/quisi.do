import type { ReactElement } from "react";

interface Props extends Intl.NumberFormatOptions {
  readonly children: number | string;
  readonly locale?: string | undefined;
}

export default function NumberFormat({
  children,
  locale,
  ...options
}: Props): ReactElement {
  const numberFormat: Intl.NumberFormat = new Intl.NumberFormat(
    locale,
    options,
  );

  const n: number =
    typeof children === 'string' ? parseFloat(children) : children;

  return <>{numberFormat.format(n)}</>;
}
