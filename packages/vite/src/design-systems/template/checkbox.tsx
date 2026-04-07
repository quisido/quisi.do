import { type ChangeEvent, type ReactElement, type Ref } from 'react';
import useIndeterminate from '../core/use-indeterminate.js';
import toChecked from '../core/to-checked.js';
import type { CheckboxProps } from '../core/checkbox-props.js';

/**
 *   A `Checkbox` component is a checkable input that has three possible values:
 * true, false, or 'mixed'. If the checkbox controls a group of elements have a
 * mixture of checked and unchecked values, use 'mixed'.
 */
export default function Checkbox({
  disabled = false,
  label,
  onCheck,
  onUncheck,
  readOnly = false,
  required = false,
  value,
}: CheckboxProps): ReactElement {
  const checked: boolean | undefined = toChecked(value);

  const ref: Ref<HTMLInputElement> = useIndeterminate(value);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    if (ev.currentTarget.checked) {
      onCheck();
    } else {
      onUncheck();
    }
  };

  return (
    <label>
      <input
        /**
         *   Due to the strong native semantics of HTML's native checkbox, use
         * its `checked` attribute and `indeterminate` IDL attribute to specify
         * its checked and mixed states, respectively.
         */
        aria-checked={undefined}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        aria-required={required}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        readOnly={readOnly}
        required={required}
        ref={ref}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}
