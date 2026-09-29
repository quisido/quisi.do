import { type ReactElement } from 'react';
import { FocusScope } from 'react-aria';

import {
  type AlertDialogProps,
  type AlertDialogType,
} from '../core/alert-dialog-props.js';
import useAlertDialog from '../core/use-alert-dialog.js';
import classes from './alert-dialog.module.scss';
import Heading from './heading.js';

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
 * An alert dialog is a type of dialog that contains an alert message, where
 * initial focus goes to an element within the dialog.
 * Alert dialogs are used to convey messages to alert the user. The alert
 * dialog contains both the alert message and the rest of the dialog.
 * An alert dialog is a special type of dialog that is intended to cause an
 * immediate, alert-level notification.
 * Unlike alerts, alert dialogs can receive a response from the user. For
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
          <div aria-hidden="true" className={classes['confetti']}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={classes['message']}>
            <span className={classes['icon']} data-type={type}>
              <span className={classes['icon-content']}>
                {icon ?? toIcon(type)}
              </span>
            </span>
            <Heading className={classes['heading']} id={headingId}>
              {heading}
            </Heading>
            <div className={classes['description']} id={descriptionId}>
              {children}
            </div>
          </div>
          <button
            aria-label="Dismiss"
            className={classes['dismiss-button']}
            onClick={handleDismissClick}
            type="button"
          >
            Got it
          </button>
          <span aria-hidden="true" className={classes['squiggle']} />
        </FocusScope>
      </div>
    </>
  );
}
