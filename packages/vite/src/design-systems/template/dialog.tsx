import type { ReactElement } from 'react';
import type { DialogProps } from '../core/dialog-props.js';
import { FocusScope } from 'react-aria';
import useDialog from '../core/use-dialog.js';
import Paragraph from './paragraph.js';
import Heading from './heading.js';
import classes from './dialog.module.scss';

/**
 * A dialog is a descendant window of the primary window of a web application.
 * Dialogs are often used to prompt the user to enter or respond to
 * information, or can represent content related to understanding or modifying
 * the content of the primary application window. A dialog that is designed to
 * interrupt workflow and prevent users from interacting with the primary web
 * application is usually modal. A dialog that allows for the user to switch
 * between interacting with the content of the primary web application and the
 * content the dialog is usually modeless (i.e., non-modal).
 * Dialogs must have at least one focusable descendant element.
 * @see {@link https://w3c.github.io/aria/#dialog | WAI-ARIA `dialog` role}
 */
export default function Dialog({
  children,
  description,
  heading,
  labelledBy: labelledByProp,
  modal = false,
  onDismiss,
}: DialogProps): ReactElement {
  const { descriptionId, handleDismiss, headingId, labelledBy, ref } =
    useDialog({
      labelledBy: labelledByProp,
      modal,
      onDismiss,
    });

  const open = ((): true | undefined => {
    if (modal) {
      return;
    }

    return true;
  })();

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={labelledBy}
      aria-modal={modal}
      className={classes['dialog']}
      open={open}
      ref={ref}
    >
      <FocusScope autoFocus={modal} contain={modal} restoreFocus>
        <div>
          <Heading id={headingId}>{heading}</Heading>
          {children}
          <Paragraph id={descriptionId}>{description}</Paragraph>
        </div>
        <button
          className={classes['close-button']}
          onClick={handleDismiss}
          type="button"
        >
          Close
        </button>
      </FocusScope>
    </dialog>
  );
}
