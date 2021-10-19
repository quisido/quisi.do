import type { History } from 'history';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import filterHrefByBlank from '../../utils/filter-href-by-blank';

interface State {
  readonly rel: string | undefined;
  readonly handleClick: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink(href: string): State {
  const history: History<unknown> = useHistory();

  const isBlank: boolean = filterHrefByBlank(href);
  return {
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,

    handleClick: useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (e: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>): void => {
        e.preventDefault();
        if (isBlank) {
          window.open(href, '_blank');
          return;
        }
        history.push(href);
      },
      [history, href, isBlank],
    ),
  };
}
