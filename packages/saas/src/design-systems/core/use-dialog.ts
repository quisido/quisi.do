import { type Ref, type RefObject, useLayoutEffect, useRef } from 'react';
import useId from './use-id.js';
import validateNonNull from '../../utils/validate-non-null.js';
import { setInertSiblings, unsetInertSiblings } from './inert.js';

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
    dialog.close();
    unsetInertSiblings(dialog);

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
      dialog.close();
      unsetInertSiblings(dialog);
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
