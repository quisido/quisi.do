import type { HTMLAttributeAnchorTarget } from 'react';
import filterHrefByBlank from '../../utils/filter-href-by-blank';
import filterHrefByExternal from '../../utils/filter-href-by-external';

interface Props {
  readonly href: string;
}

interface State {
  readonly external: boolean;
  readonly rel: string | undefined;
  readonly target: HTMLAttributeAnchorTarget;
}

export default function useAwsLink({ href }: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);

  return {
    external: filterHrefByExternal(href),
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,
    target: isBlank ? '_blank' : '_self',
  };
}
