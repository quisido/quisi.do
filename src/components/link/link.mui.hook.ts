import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import filterHrefByBlank from '../../utils/filter-href-by-blank';

interface State {
  readonly rel: string | undefined;
  readonly handleClick: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink(href: string): State {
  const navigate: NavigateFunction = useNavigate();

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
        navigate(href);
      },
      [href, isBlank, navigate],
    ),
  };
}
