import { useLayoutEffect } from 'react';
import useId from './use-id.js';

const setProperty = (
  element: HTMLElement,
  property: string,
  value: string | null,
): VoidFunction => {
  const previousValue: string | null = element.getAttribute(property);

  if (value === null) {
    element.removeAttribute(property);
  } else {
    element.setAttribute(property, value);
  }

  if (previousValue === null) {
    return (): void => {
      element.removeAttribute(property);
    };
  }

  return (): void => {
    element.setAttribute(property, previousValue);
  };
};

export default function useTooltip(htmlFor: string): string {
  const id: string = useId();

  useLayoutEffect((): VoidFunction => {
    const described: HTMLElement | null =
      window.document.getElementById(htmlFor);

    if (described === null) {
      throw new Error('A tooltip must describe an element.', { cause: id });
    }

    const undoDescribedBy = setProperty(described, 'aria-describedby', id);
    return (): void => {
      undoDescribedBy();
    };
  }, [id, htmlFor]);

  return id;
}
