import type { ChangeEvent, ReactElement } from 'react';
import type { ListBoxOption, ListBoxProps } from '../core/list-box-props.js';
import useElementId from '../../hooks/use-element-id.js';
import classes from './list-box.module.scss';

const reduceOptionsToValues = (
  values: Set<string>,
  option: HTMLOptionElement,
): Set<string> => {
  values.add(option.value);
  return values;
};

/**
 *   A list box is a widget that allows the user to select one or more items
 * from a list of choices.
 *   Items within the list are static and, unlike standard HTML select elements,
 * can contain images. List boxes contain options or groups which in turn
 * contain options.
 * @see {@link https://w3c.github.io/aria/#listbox | WAI-ARIA `listbox` role}
 */
export default function ListBox({
  label,
  labelledBy,
  onChange,
  options,
  orientation = 'vertical',
  values,
}: ListBoxProps): ReactElement {
  const selectId: string = useElementId();
  const handleChange = ({
    currentTarget: { selectedOptions },
  }: ChangeEvent<HTMLSelectElement>): void => {
    onChange([...selectedOptions].reduce(reduceOptionsToValues, new Set()));
  };

  return (
    <div
      aria-labelledby={labelledBy}
      aria-orientation={orientation}
      className={classes['list-box']}
      role="listbox"
    >
      {label && (
        <label className={classes['label']} htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        className={classes['select']}
        id={selectId}
        multiple
        onChange={handleChange}
      >
        {options.map(
          ({ children, value }: ListBoxOption): ReactElement => (
            <option
              className={classes['option']}
              key={value}
              selected={values.has(value)}
              value={value}
            >
              {children}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
