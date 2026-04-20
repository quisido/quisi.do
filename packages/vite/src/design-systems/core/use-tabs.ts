import useId from './use-id.js';

interface State {
  readonly idPrefix: string;
}

export default function useTabs(): State {
  const idPrefix: string = useId();

  return {
    idPrefix,
  };
}
