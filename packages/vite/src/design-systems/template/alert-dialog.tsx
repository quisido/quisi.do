import { FocusScope } from 'react-aria';
import type { ReactElement } from 'react';
import Heading from './heading.js';
import useAlertDialog from '../core/use-alert-dialog.js';
import type {
  AlertDialogProps,
  AlertDialogType,
} from '../core/alert-dialog-props.js';
import classes from './alert-dialog.module.scss';

const toIcon = (type: AlertDialogType): string => {
  switch (type) {
    case 'error':
      return '⛔️';
    case 'info':
      return 'ℹ️';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
  }
};

/**
 *   An alert dialog is a type of dialog that contains an alert message, where
 * initial focus goes to an element within the dialog.
 *   Alert dialogs are used to convey messages to alert the user. The alert
 * dialog contains both the alert message and the rest of the dialog.
 *   An alert dialog is a special type of dialog that is intended to cause an
 * immediate, alert-level notification.
 *   Unlike alerts, alert dialogs can receive a response from the user. For
 * example, to confirm that the user understands the alert being generated. When
 * the alert dialog is displayed, an active element within the alert dialog,
 * such as a form control or confirmation button, should receive focus.
 * @see {@link https://w3c.github.io/aria/#alertdialog | WAI-ARIA `alertdialog` role}
 */
export default function AlertDialog({
  children,
  heading,
  icon,
  onDismiss,
  type = 'info',
}: AlertDialogProps): ReactElement {
  const {
    descriptionId,
    headingId,
    labelledBy,
    overlayProps,
    ref,
    underlayProps,
  } = useAlertDialog<HTMLDivElement>({ onDismiss });

  const handleDismissClick = (): void => {
    onDismiss();
  };

  return (
    <>
      <div {...underlayProps} className={classes['underlay']} />
      <div
        {...overlayProps}
        aria-describedby={descriptionId}
        aria-labelledby={labelledBy}
        aria-modal
        className={classes['alert-dialog']}
        ref={ref}
        role="alertdialog"
      >
        <FocusScope autoFocus contain restoreFocus>
          <span className={classes['icon']}>{icon ?? toIcon(type)}</span>
          <div>
            <Heading className={classes['heading']} id={headingId}>
              {heading}
            </Heading>
            <div id={descriptionId}>{children}</div>
          </div>
          <button
            aria-label="Dismiss"
            className={classes['dismiss-button']}
            onClick={handleDismissClick}
            type="button"
          >
            &times;
          </button>
        </FocusScope>
      </div>
    </>
  );
}
