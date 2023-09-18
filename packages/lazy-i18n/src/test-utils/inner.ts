import { MatcherFunction, Nullish } from '@testing-library/react';
import isElement from '../test-utils/is-element';
import negate from '../test-utils/negate';

export default function inner(text: string): MatcherFunction {
  const hasTextContent = (element: Element): boolean =>
    element.textContent === text;
  const hasNoTextContent = negate(hasTextContent);
  return (_content: string, element: Nullish<Element>): boolean => {
    return (
      isElement(element) &&
      hasTextContent(element) &&
      Array.from(element.children).filter(isElement).every(hasNoTextContent)
    );
  };
}
