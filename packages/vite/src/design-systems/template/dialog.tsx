import type { ReactElement } from 'react';
import type { DialogProps } from '../shared/dialog-props.js';
import { FocusScope } from 'react-aria';
import useDialog from '../shared/use-dialog.js';
import Paragraph from './paragraph.jsx';
import Heading from './heading.jsx';

/**
 *   A `Dialog` component is a descendant window of the primary window of a web
 * application.
 *   Dialogs are often used to prompt the user to enter or respond to
 * information, or can represent content related to understanding or modifying
 * the content of the primary application window. A dialog that is designed to
 * interrupt workflow and prevent users from interacting with the primary web
 * application is usually modal. A dialog that allows for the user to switch
 * between interacting with the content of the primary web application and the
 * content the dialog is usually modeless (i.e., non-modal).
 *   Dialogs must have at least one focusable descendant element.
 * @see {@link https://w3c.github.io/aria/#dialog | WAI-ARIA `dialog` role}
 */
export default function Dialog({
  children,
  description,
  heading,
  label,
  labelledBy: labelledByProp,
  modal = false,
}: DialogProps): ReactElement {
  const { descriptionId, headingId, labelledBy } = useDialog({
    heading,
    label,
    labelledBy: labelledByProp,
  });

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-modal={modal}
      open
    >
      <FocusScope autoFocus={modal} contain={modal} restoreFocus>
        {heading !== undefined && (
          <Heading id={headingId} level={3}>
            {heading}
          </Heading>
        )}
        {children}
        <Paragraph id={descriptionId}>{description}</Paragraph>
      </FocusScope>
    </dialog>
  );
}
