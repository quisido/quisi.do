import type { ReactElement, ReactNode } from 'react';
import Heading from './heading.js';
import useElementId from '../../hooks/use-element-id.js';

interface BaseAlertDialogProps {
  readonly children: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: 'error' | 'info' | 'success' | 'warning' | undefined;
}

export interface HeadingAlertDialogProps extends BaseAlertDialogProps {
  readonly heading: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type AlertDialogProps =
  | HeadingAlertDialogProps
  | LabelAlertDialogProps
  | LabelledByAlertDialogProps;

/**
 *   The `AlertDialog` component is a modal alert dialog that notifies users of
 * urgent information that demands their immediate attention by interrupting
 * their workflow and requiring a response.
 *   For example:
 * - error messages that require confirmation
 * - action confirmation prompts
 *   As the name implies, an alert dialog is a mashup of the `Alert` and
 * `Dialog` components. It is a type of dialog with similar use cases as an
 * alert, but for when a user response is required.
 *   An alert dialog must have at least one focusable control (e.g. Confirm,
 * Close, or Cancel) and focus must be moved to that control when the alert
 * dialog appears. Alert dialogs can have additional interactive controls such
 * as text fields and checkboxes.
 */
export default function AlertDialog({
  children,
  heading,
  icon: iconProp,
  label,
  labelledBy: labelledByProp,
  onDismiss,
  type = 'info',
}: AlertDialogProps): ReactElement {
  const descriptionId: string = useElementId();
  const headingId: string = useElementId();

  const icon = ((): ReactNode => {
    if (iconProp !== undefined) {
      return iconProp;
    }

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
  })();

  const labelledBy = ((): string | undefined => {
    if (heading !== undefined) {
      return headingId;
    }

    if (labelledByProp !== undefined) {
      return labelledByProp;
    }

    return undefined;
  })();

  return (
    <div
      aria-describedby={descriptionId}
      aria-label={label}
      aria-labelledby={labelledBy}
      data-type={type}
      role="alertdialog"
    >
      <span>{icon}</span>
      <div>
        {heading !== undefined && (
          <Heading id={headingId} level={3}>
            {heading}
          </Heading>
        )}
        <div id={descriptionId}>{children}</div>
      </div>
      <button
        aria-label="Dismiss"
        autoFocus
        onClick={(): void => {
          onDismiss();
        }}
        type="button"
      >
        &times;
      </button>
    </div>
  );
}
