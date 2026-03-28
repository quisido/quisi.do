import type { ReactNode } from 'react';
import useHeadingOrLabel from './use-heading-or-label.js';
import useId from './use-id.js';

interface Props {
  readonly heading: ReactNode | undefined;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
}

export interface DialogState {
  readonly descriptionId: string;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
}

export default function useDialog({
  heading,
  label,
  labelledBy,
}: Props): DialogState {
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
