import { useLayoutEffect } from 'react';
import useId from './use-id.js';
import appendDescribedBy from './append-described-by.js';
import { mapToString } from 'fmrs';

interface Props {
  readonly busy: boolean;
  readonly describes: string | undefined;
  readonly id: string | undefined;
}

interface State {
  readonly id: string;
}

export default function useProgressBar({
  busy,
  describes,
  id: idProp,
}: Props): State {
  const idState: string = useId();
  const id: string = idProp ?? idState;

  useLayoutEffect((): VoidFunction | undefined => {
    if (describes === undefined) {
      return;
    }

    const described: HTMLElement | null =
      window.document.getElementById(describes);
    if (described === null) {
      throw new Error(
        `Progress bar (#${id}) cannot describe missing element (#${describes}).`,
      );
    }

    described.setAttribute('aria-busy', mapToString(busy));
    const removeDescribedBy: VoidFunction = appendDescribedBy(described, id);
    return (): void => {
      described.removeAttribute('aria-busy');
      removeDescribedBy();
    };
  }, [busy, describes, id]);

  return {
    id,
  };
}
