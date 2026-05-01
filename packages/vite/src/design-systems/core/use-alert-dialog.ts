import useId from './use-id.js';

export interface AlertDialogState {
  readonly descriptionId: string;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
}

export default function useAlertDialog(): AlertDialogState {
  const descriptionId: string = useId();
  const headingId: string = useId();

  return {
    descriptionId,
    headingId,
    labelledBy: headingId,
  };
}
