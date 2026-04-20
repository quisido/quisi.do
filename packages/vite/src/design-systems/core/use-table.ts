import useId from './use-id.js';

interface State {
  readonly captionId: string;
}

export default function useTable(): State {
  const captionId: string = useId();

  return {
    captionId,
  };
}
