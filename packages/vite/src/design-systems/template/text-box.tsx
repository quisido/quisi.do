import type { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import type { TextBoxProps } from '../core/text-box-props.js';
import classes from './text-box.module.scss';

/**
 *   A text box is a type of input that allows free-form text as its value.
 *   If the `multiline` prop is `true`, the widget accepts line breaks within
 * the input. Otherwise, this is a simple text box.

Examples include:
- an error icon, where the containing textbox has been provided an aria-invalid, aria-errormessage, or both attributes;
- an icon of a user silhouette, where the textbox is also visibly labeled or provided an accessible name of "name" or "username"; and
- a graphical status indicator, such as a gauge to represent characters remaining, which represents dynamically updating text available outside of the textbox.

 * @see {@link https://w3c.github.io/aria/#textbox | WAI-ARIA `textbox` role}
 */
export default function TextBox({
  label,
  multiline = false,
  onChange,
  value,
}: TextBoxProps): ReactElement {
  const [Component, props] = ((): [
    'input' | 'textarea',
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  ] => {
    if (multiline) {
      return [
        'textarea',
        {
          children: value,
          className: `${classes['text-box']} ${classes['textarea']}`,
          value,
        },
      ];
    }

    return [
      'input',
      {
        className: `${classes['text-box']} classes['input']`,
        type: 'text',
        value,
      },
    ];
  })();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    onChange(event.currentTarget.value);
  };

  return (
    <label className={classes['root']}>
      <span className={classes['label']}>{label}</span>
      <Component
        aria-multiline={multiline}
        onChange={handleChange}
        role="textbox"
        {...props}
      />
    </label>
  );
}
