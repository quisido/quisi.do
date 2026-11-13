import { type Ref, type RefObject, useLayoutEffect, useRef } from 'react';
import validateNonNull from '../../utils/validate-non-null.js';
import { setInertSiblings, unsetInertSiblings } from './inert.js';
import useId from './use-id.js';

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

  const handleDismiss = (): void => {
    const dialog: HTMLDialogElement = validateNonNull(ref.current);
    // Re-enable the opener before close() restores focus to it.
    unsetInertSiblings(dialog);
    dialog.close();

    if (onDismiss !== undefined) {
      onDismiss();
    }
  };

  useLayoutEffect((): VoidFunction | undefined => {
    if (!modal) {
      return;
    }

    const dialog: HTMLDialogElement = validateNonNull(ref.current);
    dialog.showModal();
    setInertSiblings(dialog);

    return (): void => {
      unsetInertSiblings(dialog);
      dialog.close();
    };
  }, [modal]);

  return {
    descriptionId,
    handleDismiss,
    headingId,
    labelledBy: labelledBy ?? headingId,
    ref,
  };
}
