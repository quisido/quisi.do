import { type ReactNode, type Ref, useLayoutEffect, useRef } from 'react';
import useHeadingOrLabel from './use-heading-or-label.js';
import useId from './use-id.js';
import validateNonNull from '../../utils/validate-non-null.js';

interface Props {
  readonly heading?: ReactNode | undefined;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly modal: boolean;
  readonly onDismiss?: VoidFunction | undefined;
}

export interface DialogState {
  readonly descriptionId: string;
  readonly handleDismiss: VoidFunction;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
  readonly ref: Ref<HTMLDialogElement>;
}

export default function useDialog({
  heading,
  label,
  labelledBy,
  modal,
  onDismiss,
}: Props): DialogState {
  const descriptionId: string = useId();
  const headingId: string = useId();
  const ref: Ref<HTMLDialogElement> = useRef(null);

  useLayoutEffect((): VoidFunction | undefined => {
    if (!modal) {
      return;
    }

    const dialog: HTMLDialogElement = validateNonNull(ref.current);
    dialog.showModal();

    return (): void => {
      dialog.close();
    };
  }, [modal]);

  return {
    descriptionId,
    handleDismiss: (): void => {
      const dialog: HTMLDialogElement = validateNonNull(ref.current);
      dialog.close();

      if (onDismiss !== undefined) {
        onDismiss();
      }
    },
    headingId,
    labelledBy: useHeadingOrLabel({
      heading,
      headingId,
      label,
      labelledBy,
    }),
    ref,
  };
}
