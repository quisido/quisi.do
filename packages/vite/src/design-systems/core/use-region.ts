import useId from './use-id.js';

interface State {
  readonly headingId: string;
}

export default function useRegion(): State {
  const headingId: string = useId();

  return {
    headingId,
  };
}
