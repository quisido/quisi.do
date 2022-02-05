const FIRST = 0;

export default function mapAwsLinkSpanToAnchorElement(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  span: Readonly<HTMLSpanElement>,
): HTMLAnchorElement {
  const a: HTMLAnchorElement | null = span
    .getElementsByTagName('a')
    .item(FIRST);

  if (a === null) {
    throw new Error('Expected link to have an anchor element.');
  }

  return a;
}
