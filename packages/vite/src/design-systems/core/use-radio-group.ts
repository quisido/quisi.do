import { useMemo } from 'react';
import useId from './use-id.js';

interface Props {
  readonly hasLabel: boolean;
  readonly labelledBy?: string | undefined;
  readonly owns?: readonly string[] | ReadonlySet<string> | string | undefined;
  readonly radiosSize: number;
}

interface State {
  readonly id: string;
  readonly labelId: string;
  readonly labelledBy: string | undefined;
  readonly owns: string | undefined;
  readonly setSize: number;
}

const EMPTY_SET: ReadonlySet<never> = new Set();

export default function useRadioGroup({
  hasLabel,
  labelledBy: labelledByProp,
  owns: ownsProp,
  radiosSize,
}: Props): State {
  const id: string = useId();
  const labelId: string = useId();

  const ownsSet = useMemo((): ReadonlySet<string> => {
    if (ownsProp === undefined) {
      return EMPTY_SET;
    }

    if (typeof ownsProp === 'string') {
      const ids: readonly string[] = ownsProp.split(/\s+/u);
      return new Set(ids);
    }

    return new Set(ownsProp);
  }, [ownsProp]);

  return {
    id,
    labelId,

    /**
     *   Because the inputs are either `{ hasLabel: true }` or
     * `{ hasLabel: false, labelledBy: string }`, this value will technically
     * always be a string. This type strictness is not worth the added type
     * complexity, though.
     */
    labelledBy: ((): string | undefined => {
      if (hasLabel) {
        return labelId;
      }

      return labelledByProp;
    })(),

    owns: useMemo((): string | undefined => {
      if (ownsProp === undefined) {
        return;
      }

      if (typeof ownsProp === 'string') {
        return ownsProp;
      }

      return [...ownsProp].join(' ');
    }, [ownsProp]),

    setSize: radiosSize + ownsSet.size,
  };
}
