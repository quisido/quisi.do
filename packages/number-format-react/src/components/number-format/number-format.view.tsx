interface Props extends Intl.NumberFormatOptions {
  readonly children: number | string;
  readonly locale?: string | undefined;
}

export default function NumberFormat({
  children,
  locale,
  ...options
}: Props): JSX.Element {
  const numberFormat: Intl.NumberFormat = new Intl.NumberFormat(
    locale,
    options,
  );

  const n: number =
    typeof children === 'string' ? parseFloat(children) : children;

  return <>{numberFormat.format(n)}</>;
}
