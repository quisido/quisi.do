import { type ChangeEvent, type ReactElement } from 'react';

import useElementId from '../../hooks/use-element-id.js';
import {
  type ListBoxOption,
  type ListBoxProps,
} from '../core/list-box-props.js';
import classes from './list-box.module.scss';

const reduceOptionsToValues = (
  values: Set<string>,
  option: HTMLOptionElement,
): Set<string> => {
  values.add(option.value);
  return values;
};

/**
 * A list box is a widget that allows the user to select one or more items
 * from a list of choices.
 * Items within the list are static and, unlike standard HTML select elements,
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
    <div className={classes['list-box']} data-orientation={orientation}>
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span aria-hidden="true" className={classes['squiggle']} />
      <span aria-hidden="true" className={classes['dots']} />
      {label && (
        <label className={classes['label']} htmlFor={selectId}>
          <span aria-hidden="true" className={classes['label-mark']}>
            PICK!
          </span>
          <span className={classes['label-text']}>{label}</span>
        </label>
      )}
      <div className={classes['stage']}>
        <span aria-hidden="true" className={classes['stage-shadow']} />
        <span aria-hidden="true" className={classes['stage-stripes']} />
        <select
          aria-labelledby={labelledBy}
          aria-orientation={orientation}
          className={classes['select']}
          id={selectId}
          multiple
          onChange={handleChange}
          role="listbox"
          value={[...values]}
        >
          {options.map(({ children, value }: ListBoxOption): ReactElement => (
            <option className={classes['option']} key={value} value={value}>
              {children}
            </option>
          ))}
        </select>
      </div>
      <span aria-hidden="true" className={classes['caption']}>
        CTRL / ⌘ + CLICK FOR A MIX
      </span>
    </div>
  );
}
