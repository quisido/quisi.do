const FIRST = 0;

export default function mapAwsLinkSpanToAnchorElement(
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
