import { MutableRefObject } from 'react';
import mapRefToTbody from '../utils/map-ref-to-tbody';

export default function mapRefToRows(
  ref: MutableRefObject<HTMLDivElement | null>,
): HTMLCollectionOf<HTMLTableRowElement> | null {
  const tbody: HTMLTableSectionElement | null = mapRefToTbody(ref);
  if (tbody === null) {
    return null;
  }

  return tbody.getElementsByTagName('tr');
}
