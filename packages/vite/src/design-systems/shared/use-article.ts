import type { ReactNode } from 'react';
import useHeadingOrLabel from './use-heading-or-label.js';
import useId from './use-id.js';
import useHeadingLevel from './use-heading-level.js';

export interface ArticleState {
  readonly headingId: string;
  readonly headingLevel: number;
  readonly labelledBy: string | undefined;
}

interface Props {
  readonly heading: ReactNode | undefined;
  readonly label: string | undefined;
  readonly labelledBy: string | undefined;
}

export default function useArticle({
  heading,
  label,
  labelledBy,
}: Props): ArticleState {
  const headingId: string = useId();

  return {
    headingId,
    headingLevel: useHeadingLevel(),
    labelledBy: useHeadingOrLabel({ heading, headingId, label, labelledBy }),
  };
}
