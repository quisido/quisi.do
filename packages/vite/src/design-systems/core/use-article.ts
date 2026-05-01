import useId from './use-id.js';
import useHeadingLevel from './use-heading-level.js';
import type { RefObject } from 'react';

export interface ArticleState {
  readonly headingId: string;
  readonly headingLevel: number | undefined;
  readonly headingRef: RefObject<HTMLElement | null>;
  readonly labelledBy: string | undefined;
}

interface Props {
  readonly labelledBy: string | undefined;
}

export default function useArticle({ labelledBy }: Props): ArticleState {
  const headingId: string = useId();
  const { level: headingLevel, ref: headingRef } = useHeadingLevel();

  return {
    headingId,
    headingLevel,
    headingRef,
    labelledBy: labelledBy ?? headingId,
  };
}
