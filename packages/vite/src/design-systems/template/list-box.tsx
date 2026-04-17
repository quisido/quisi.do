import type { ReactElement } from 'react';
import type { ListBoxOption, ListBoxProps } from '../core/list-box-props.js';
import useElementId from '../../hooks/use-element-id.js';
import classes from './list-box.module.scss';

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
  options,
  orientation = 'vertical',
}: ListBoxProps): ReactElement {
  const selectId: string = useElementId();

  return (
    <div
      aria-labelledby={labelledBy}
      aria-orientation={orientation}
      className={classes['list-box']}
      role="listbox"
    >
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} multiple>
        {options.map(
          ({ children, key }: ListBoxOption): ReactElement => (
            <option key={key}>{children}</option>
          ),
        )}
      </select>
    </div>
  );
}
