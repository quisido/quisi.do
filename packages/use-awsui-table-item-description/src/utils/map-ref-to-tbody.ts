import type { MutableRefObject } from 'react';

const FIRST = 0;

export default function mapRefToTbody(
  ref: Readonly<MutableRefObject<HTMLElement | null>>,
): HTMLTableSectionElement | null {
  if (ref.current === null) {
    return null;
  }

  return ref.current.getElementsByTagName('tbody').item(FIRST);
}
