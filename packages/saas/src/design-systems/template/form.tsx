import type { ReactElement, SubmitEvent } from 'react';
import type { FormProps } from '../core/form-props.js';
import useForm from '../core/use-form.js';
import Heading from './heading.js';
import classes from './form.module.scss';

/**
 * A form is a landmark region containing items and objects that, as a whole,
 * combine to create a form.
 * A form can contain a mix of host language form controls, scripted controls,
 * and hyperlinks. If the purpose of a form is to submit search criteria, use
 * the `Search` component instead.
 * @see {@link https://w3c.github.io/aria/#form | WAI-ARIA `form` role}
 */
export default function Form({
  children,
  heading,
  label,
  labelledBy: labelledByProp,
  onSubmit,
}: FormProps): ReactElement {
  const { headingId, labelledBy } = useForm({
    label,
    labelledBy: labelledByProp,
  });

  const handleSubmit = (ev: SubmitEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    onSubmit();
  };

  return (
    <form
      aria-label={label}
      aria-labelledby={labelledBy}
      className={classes['form']}
      onSubmit={handleSubmit}
    >
      <Heading className={classes['heading']} id={headingId}>
        {heading}
      </Heading>
      {children}
    </form>
  );
}
