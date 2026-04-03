import type { ReactElement } from 'react';
import type { DefinitionProps } from '../shared/definition-props.js';

/**
 *   A `Definition` component marks the definition of a term or concept.
 *   Set the `Term` component's `definitionId` prop to this component's ID.
 *   _Do not_ use interactive elements such as form controls within a
 * definition.
 * @see {@link https://w3c.github.io/aria/#definition | WAI-ARIA `definition` role}
 */
export default function Definition({
  children,
  id,
}: DefinitionProps): ReactElement {
  return (
    <dfn id={id} role="definition">
      {children}
    </dfn>
  );
}
