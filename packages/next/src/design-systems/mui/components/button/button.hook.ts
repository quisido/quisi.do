'use client';

import { useRouter } from 'next/navigation.js';
import { useEffect, type MouseEvent, type ReactNode } from 'react';
import innerText from 'react-innertext';
import useEffectEvent from '../../../../hooks/use-effect-event';
import useEvent from '../../../../hooks/use-event/use-event';
import isHrefBlank from '../../../../utils/is-href-blank';

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
}: Props): State {
  const isBlank: boolean = isHrefBlank(href);
  const label: string = innerText(children);

  // Contexts
  const emit = useEvent();
  const router = useRouter();

  useEffect((): void => {
    if (isBlank || typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, isBlank, router]);

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
