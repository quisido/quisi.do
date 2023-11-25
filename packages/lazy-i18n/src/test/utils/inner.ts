import type { MatcherFunction } from '@testing-library/react';
import isElement from './is-element.js';
import negate from './negate.js';

export default function inner(text: string): MatcherFunction {
  const hasTextContent = (element: Element): boolean =>
    element.textContent === text;
  const hasNoTextContent = negate(hasTextContent);
  return (_content: string, element: Element | null | undefined): boolean => {
    if (!isElement(element) || !hasTextContent(element)) {
      return false;
    }

    /**
     *   eslint can't correctly determine that `HTMLCollection` is
     * `ArrayLike<Element>`.
     */
    const elements: readonly Element[] = Array.from(
      element.children as ArrayLike<Element>,
    );

    return elements.filter(isElement).every(hasNoTextContent);
  };
}
