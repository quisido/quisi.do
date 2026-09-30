import { type ChangeEvent, type ReactElement } from 'react';

import { type SearchBoxProps } from '../core/search-box-props.js';
import classes from './search-box.module.scss';

/**
 * A search box is a type of textbox intended for specifying search criteria.
 * @see {@link https://w3c.github.io/aria/#searchbox | WAI-ARIA `searchbox` role}
 */
export default function SearchBox({
  disabled = false,
  label,
  onChange,
  readOnly = false,
  required = false,
  value,
}: SearchBoxProps): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <label
      className={classes['root']}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      <span aria-hidden="true" className={classes['pink-orbit']} />
      <span aria-hidden="true" className={classes['yellow-wedge']} />
      <span aria-hidden="true" className={classes['zigzag']} />
      <span aria-hidden="true" className={classes['confetti']} />
      <span className={classes['panel']}>
        <span className={classes['label']}>{label}</span>
        <span className={classes['field']}>
          <input
            aria-disabled={disabled}
            aria-readonly={readOnly}
            aria-required={required}
            className={classes['search-box']}
            disabled={disabled}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            role="searchbox"
            type="search"
            value={value}
          />
          <span aria-hidden="true" className={classes['lens']} />
        </span>
      </span>
    </label>
  );
}
