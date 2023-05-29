import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import filterHrefByBlank from '../../../../utils/filter-href-by-blank';

interface State {
  readonly rel: string | undefined;
  readonly handleClick: (
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink(href: string): State {
  const navigate: NavigateFunction = useNavigate();

  const isBlank: boolean = filterHrefByBlank(href);
  return {
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,

    handleClick: useCallback(
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
