import type { ReactNode } from 'react';
import useId from './use-id.js';
import useHeadingOrLabel from './use-heading-or-label.js';

interface Props {
  readonly heading?: ReactNode | undefined;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
}

export interface AlertDialogState {
  readonly descriptionId: string;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
}

export default function useAlertDialog({
  heading,
  label,
  labelledBy,
}: Props): AlertDialogState {
  const descriptionId: string = useId();
  const headingId: string = useId();

  return {
    descriptionId,
    headingId,
    labelledBy: useHeadingOrLabel({
      heading,
      headingId,
      label,
      labelledBy,
    }),
  };
}
