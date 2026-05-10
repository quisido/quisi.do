import useId from './use-id.js';

interface RegionState {
  readonly headingId: string;
  readonly labelledBy: string;
}

export default function useRegion(): RegionState {
  const headingId: string = useId();

  return {
    headingId,
    labelledBy: headingId,
  };
}
