import type { ChangeEvent, ReactElement } from 'react';
import type { SearchBoxProps } from '../core/search-box-props.js';
import classes from './search-box.module.scss';

/**
 *   A search box is a type of textbox intended for specifying search criteria.
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
    <label className={classes['root']}>
      <span className={classes['label']}>{label}</span>
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
    </label>
  );
}
