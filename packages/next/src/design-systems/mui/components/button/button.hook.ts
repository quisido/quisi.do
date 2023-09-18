import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import innerText from 'react-innertext';
import useEffectEvent from '../../../../hooks/use-effect-event';
import useEvent from '../../../../hooks/use-event/use-event';
import filterHrefByBlank from '../../../../utils/filter-href-by-blank';

interface Props {
  readonly category: string;
  readonly children: ReactNode;
  readonly href: string | undefined;
  readonly onClick?: VoidFunction | undefined;
  readonly variant: 'primary';
}

interface State {
  readonly variant: 'contained';
  readonly handleClick: (
    event: Readonly<MouseEvent<HTMLButtonElement>>,
  ) => void;
}

export default function useMuiButton({
  category,
  children,
  href,
  onClick,
}: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);
  const label: string = innerText(children);

  // Contexts
  const emit = useEvent();
  const router: AppRouterInstance = useRouter();

  // States
  return {
    variant: 'contained',

    handleClick: useEffectEvent(
      (e: Readonly<MouseEvent<HTMLButtonElement>>): void => {
        e.preventDefault();

        if (typeof onClick === 'function') {
          onClick();
        }

        if (typeof href !== 'string') {
          emit('click', {
            category,
            label,
            target: '_self',
            url: null,
          });
          return;
        }

        if (isBlank) {
          window.open(href, '_blank');
          emit('click', {
            category,
            label,
            target: '_blank',
            url: href,
          });
          return;
        }

        router.push(href);
        emit('click', {
          category,
          label,
          target: '_self',
          url: href,
        });
      },
    ),
  };
}
