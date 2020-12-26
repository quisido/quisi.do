import { MutableRefObject } from 'react';

export default function mapRefToTbody(
  ref: MutableRefObject<HTMLDivElement | null>,
): HTMLTableSectionElement | null {
  if (ref.current === null) {
    return null;
  }

  return ref.current.getElementsByTagName('tbody').item(0);
}
