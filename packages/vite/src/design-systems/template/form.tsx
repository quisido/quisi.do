import type { ReactElement } from 'react';
import type { FormProps } from '../shared/form-props.js';

/**
 *   A `Form` component is a landmark region containing items and objects that,
 * as a whole, combine to create a form. When the purpose is specifically to
 * submit search criteria, prefer `Search` instead.
 */
export default function Form({ children, label }: FormProps): ReactElement {
  return <form aria-label={label}>{children}</form>;
}
