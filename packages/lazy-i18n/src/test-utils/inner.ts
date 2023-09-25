import type { MatcherFunction } from '@testing-library/react';
import isElement from '../test-utils/is-element.js';
import negate from '../test-utils/negate.js';

export default function inner(text: string): MatcherFunction {
  const hasTextContent = (element: Element): boolean =>
    element.textContent === text;
  const hasNoTextContent = negate(hasTextContent);
  return (_content: string, element: Element | null | undefined): boolean => {
    return (
      isElement(element) &&
      hasTextContent(element) &&
      Array.from(element.children).filter(isElement).every(hasNoTextContent)
    );
  };
}
