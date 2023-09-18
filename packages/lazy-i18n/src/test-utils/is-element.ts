import { Nullish } from '@testing-library/react';

export default function isElement(value: Nullish<Element>): value is Element {
  return typeof value !== 'undefined' && value !== null;
}
