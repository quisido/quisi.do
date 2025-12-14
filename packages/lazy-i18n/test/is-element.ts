export default function isElement(
  value: Element | null | undefined,
): value is Element {
  return typeof value !== 'undefined' && value !== null;
}
