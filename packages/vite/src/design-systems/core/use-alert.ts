import useId from './use-id.js';

export interface AlertState {
  readonly descriptionId: string;
  readonly headingId: string;
  readonly labelledBy: string | undefined;
}

export default function useAlert(): AlertState {
  const descriptionId: string = useId();
  const headingId: string = useId();

  return {
    descriptionId,
    headingId,
    labelledBy: headingId,
  };
}
