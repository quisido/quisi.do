const FIRST = 0;

export default function getHead(): HTMLHeadElement {
  const head: HTMLHeadElement | null = document
    .getElementsByTagName('head')
    .item(FIRST);

  if (head === null) {
    throw new Error('Expected to find a head element.');
  }

  return head;
}
