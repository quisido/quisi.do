import type { ReactElement } from 'react';
import type { OptionProps } from '../core/option-props.js';

/**
 *   An `Option` component represents an item in a `ListBox`. It should be an
 * accessibility child of a `ListBox` or of a `Group` inside a `ListBox`.
 */
export default function Option({ children }: OptionProps): ReactElement {
  return <option>{children}</option>;
}
