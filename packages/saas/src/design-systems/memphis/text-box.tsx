import { type ChangeEvent, type ReactElement } from 'react';

import { type TextBoxProps } from '../core/text-box-props.js';
import classes from './text-box.module.scss';

/** A controlled, labelled text field with single and multiline variants. */
export default function TextBox({
  label,
  multiline = false,
  onChange,
  value,
}: TextBoxProps): ReactElement {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    onChange(event.currentTarget.value);
  };

  const fieldProps = {
    'aria-multiline': multiline,
    className: `${classes['text-box']} ${
      multiline ? classes['textarea'] : classes['input']
    }`,
    onChange: handleChange,
    role: 'textbox',
    value,
  } as const;

  return (
    <label className={classes['root']} data-multiline={multiline}>
      <span aria-hidden="true" className={classes['dot-grid']} />
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span aria-hidden="true" className={classes['zigzag']} />
      <span className={classes['stage']}>
        <span className={classes['label']}>{label}</span>
        <span aria-hidden="true" className={classes['squiggle']} />
        {multiline ? (
          <textarea {...fieldProps} />
        ) : (
          <input {...fieldProps} type="text" />
        )}
        <span aria-hidden="true" className={classes['confetti']} />
      </span>
    </label>
  );
}
