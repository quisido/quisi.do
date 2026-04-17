import type { ChangeEvent, ReactElement } from 'react';
import type { Radio, RadioGroupProps } from '../core/radio-group-props.js';
import useRadioGroup from '../core/use-radio-group.js';
import classes from './radio-group.module.scss';

/**
 *   A radio group is group of radio buttons, checkable inputs only one of which
 * can be checked at a time.
 *   A radio group is a type of select list that can only have a single entry
 * checked at any one time. When one item in the group is checked, the
 * previously checked item becomes unchecked.
 * @see {@link https://w3c.github.io/aria/#radiogroup | WAI-ARIA `radiogroup` role}
 * @see {@link https://w3c.github.io/aria/#radio | WAI-ARIA `radio` role}
 */
export default function RadioGroup<
  T extends string | number = string | number,
>({
  label,
  labelledBy: labelledByProp,
  onChange,
  owns: ownsProp,
  radios,
  readOnly = false,
  required = false,
  value: groupValue = null,
}: RadioGroupProps<T>): ReactElement {
  const { id, labelledBy, owns, setSize } = useRadioGroup({
    hasLabel: label !== undefined,
    labelledBy: labelledByProp,
    owns: ownsProp,
    radiosSize: radios.length,
  });

  /**
   *   If the radio group owns any other elements, we cannot infer a radio's
   * position in the set.
   */
  const getPositionInSet = (index: number): number | undefined => {
    if (ownsProp !== undefined) {
      return;
    }

    return index + 1;
  };

  return (
    <div
      aria-labelledby={labelledBy}
      aria-owns={owns}
      aria-readonly={readOnly}
      aria-required={required}
      className={classes['radio-group']}
      id={id}
      role="radiogroup"
    >
      {label && (
        <label htmlFor={labelledBy} id={labelledBy}>
          {label}
        </label>
      )}
      {radios.map(
        (
          { key, label, positionInSet: positionInSetProp, value }: Radio<T>,
          index: number,
        ): ReactElement => {
          const checked: boolean = value === groupValue;
          const positionInSet: number | undefined =
            positionInSetProp ?? getPositionInSet(index);

          const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
            if (!event.currentTarget.checked) {
              return;
            }
            onChange(value);
          };

          return (
            <label key={key}>
              <input
                aria-checked={checked}
                aria-posinset={positionInSet}
                aria-readonly={readOnly}
                aria-required={required}
                aria-setsize={setSize}
                onChange={handleChange}
                checked={checked}
                readOnly={readOnly}
                required={required}
                role="radio"
                type="radio"
                value={value}
              />
              {label}
            </label>
          );
        },
      )}
    </div>
  );
}
