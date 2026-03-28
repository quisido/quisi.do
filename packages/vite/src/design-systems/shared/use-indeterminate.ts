import { type Ref, useLayoutEffect, useRef } from 'react';
import assert from './assert.js';

/**
 *   For native checkboxes, this hook will manage its `indeterminate` IDL
 * attribute.
 *   For non-native checkboxes, use `aria-checked` instead.
 */
export default function useIndeterminate(
  value: boolean | 'mixed',
): Ref<HTMLInputElement> {
  const ref: Ref<HTMLInputElement> = useRef(null);

  useLayoutEffect((): void => {
    const { current: element } = ref;
    assert(element !== null, 'Expected a checkbox element.');
    element.indeterminate = value === 'mixed';
  }, [value]);

  return ref;
}
