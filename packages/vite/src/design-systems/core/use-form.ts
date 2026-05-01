import type { RefObject } from 'react';
import useElementId from '../../hooks/use-element-id.js';
import useHeadingLevel from './use-heading-level.js';

interface Props {
  readonly labelledBy: string | undefined;
}

interface State {
  readonly headingId: string;
  readonly headingLevel: number | undefined;
  readonly headingRef: RefObject<HTMLElement | null>;
  readonly labelledBy: string;
}

export default function useForm({ labelledBy }: Props): State {
  const headingId: string = useElementId();
  const { level: headingLevel, ref: headingRef } = useHeadingLevel();

  return {
    headingId,
    headingLevel,
    headingRef,
    labelledBy: labelledBy ?? headingId,
  };
}
