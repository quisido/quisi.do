import { type Ref, type RefObject, useLayoutEffect, useRef } from 'react';
import useId from './use-id.js';
import validateNonNull from '../../utils/validate-non-null.js';

interface Props {
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
  labelledBy,
  modal,
  onDismiss,
}: Props): DialogState {
  const descriptionId: string = useId();
  const headingId: string = useId();
  const ref: RefObject<HTMLDialogElement | null> = useRef(null);

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
    labelledBy: labelledBy ?? headingId,
    ref,
  };
}
