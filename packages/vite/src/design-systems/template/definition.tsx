import type { ReactElement } from 'react';
import type { DefinitionProps } from '../core/definition-props.js';
import classes from './definition.module.scss';

/**
 *   A definition marks the definition of a term or concept.
 *   Set the `Term` component's `definitionId` prop to this component's `id`.
 * @see {@link https://w3c.github.io/aria/#definition | WAI-ARIA `definition` role}
 */
export default function Definition({
  children,
  id,
}: DefinitionProps): ReactElement {
  return (
    <dfn className={classes['definition']} id={id} role="definition">
      {children}
    </dfn>
  );
}
