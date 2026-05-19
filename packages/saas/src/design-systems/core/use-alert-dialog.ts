import { useOverlay, usePreventScroll } from '@react-aria/overlays';
import useId from './use-id.js';
import { type HTMLAttributes, type RefObject, useRef } from 'react';

export interface AlertDialogState<T extends HTMLElement> {
  readonly descriptionId: string;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
  readonly overlayProps: HTMLAttributes<HTMLElement>;
  readonly ref: RefObject<T | null>;
  readonly underlayProps: HTMLAttributes<HTMLElement>;
}

interface Props {
  readonly onDismiss: () => void;
}

export default function useAlertDialog<T extends HTMLElement>({
  onDismiss,
}: Props): AlertDialogState<T> {
  const descriptionId: string = useId();
  const headingId: string = useId();
  usePreventScroll();
  const ref: RefObject<T | null> = useRef(null);

  const { overlayProps, underlayProps } = useOverlay(
    {
      isDismissable: false,
      isKeyboardDismissDisabled: false,
      isOpen: true,
      onClose: onDismiss,
      shouldCloseOnBlur: false,
    },
    ref,
  );

  return {
    descriptionId,
    headingId,
    labelledBy: headingId,
    overlayProps,
    ref,
    underlayProps,
  };
}
