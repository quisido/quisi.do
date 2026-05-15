import { useLayoutEffect } from 'react';
import useId from './use-id.js';
import appendDescribedBy from './append-described-by.js';
import { mapToString } from 'fmrs';

interface Props {
  readonly busy: boolean;
  readonly describes: string | undefined;
  readonly id: string | undefined;
  readonly max: number;
  readonly min: number;
  readonly value: number | undefined;
}

interface State {
  readonly id: string;
}

export default function useProgressBar({
  busy,
  describes,
  id: idProp,
  max,
  min,
  value,
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

  useLayoutEffect((): void => {
    if (value === undefined || value <= max) {
      return;
    }

    throw new Error(
      `A progress bar's value cannot be greater than its maximum: ${value} > ${max}`,
    );
  }, [max, value]);

  useLayoutEffect((): void => {
    if (value === undefined || value >= min) {
      return;
    }

    throw new Error(
      `A progress bar's value cannot be less than its minimum: ${value} < ${min}`,
    );
  }, [min, value]);

  return {
    id,
  };
}
