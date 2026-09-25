import { type RefObject, useLayoutEffect } from 'react';
import { setInertSiblings, unsetInertSiblings } from './inert.js';
import validateNonNull from '../../utils/validate-non-null.js';

export default function useModal(
  elementRef: RefObject<HTMLElement | null>,
): void {
  useLayoutEffect((): VoidFunction | undefined => {
    const element: HTMLElement = validateNonNull(elementRef.current);
    setInertSiblings(element);
    return (): void => {
      unsetInertSiblings(element);
    };
  }, [elementRef]);
}
