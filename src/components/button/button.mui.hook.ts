import type { MouseEvent } from 'react';
import { useMemo } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import filterHrefByBlank from '../../utils/filter-href-by-blank';

interface Props {
  readonly href: string | undefined;
  readonly variant: 'primary';
}

interface State {
  readonly variant: 'contained';
  readonly handleClick: // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  ((event: Readonly<MouseEvent<HTMLButtonElement>>) => void) | undefined;
}

export default function useMuiButton({ href }: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);
  const navigate: NavigateFunction = useNavigate();

  return {
    variant: 'contained',

    handleClick:
      useMemo((): // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      | ((event: Readonly<MouseEvent<HTMLButtonElement>>) => void)
        | undefined => {
        if (typeof href !== 'string') {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        return (e: Readonly<MouseEvent<HTMLButtonElement>>): void => {
          e.preventDefault();
          if (isBlank) {
            window.open(href, '_blank');
            return;
          }
          navigate(href);
        };
      }, [href, isBlank, navigate]),
  };
}
