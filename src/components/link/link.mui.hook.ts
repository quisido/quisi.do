import type { History } from 'history';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

interface State {
  readonly handleClick: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink(path: string): State {
  const history: History<unknown> = useHistory();

  return {
    handleClick: useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (e: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>): void => {
        e.preventDefault();
        history.push(path);
      },
      [history, path],
    ),
  };
}
