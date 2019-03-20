'use client';

import { useRouter } from 'next/navigation.js';
import { useEffect, type MouseEvent, type ReactNode } from 'react';
import innerText from 'react-innertext';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import useEmit from '../../../../hooks/use-emit/index.js';

interface Props {
  readonly children: ReactNode;
  readonly feature: string;
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
  children,
  feature,
  href,
  onClick,
}: Props): State {
  const label: string = innerText(children);

  // Contexts
  const emit = useEmit();
  const router = useRouter();

  useEffect((): void => {
    if (typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, router]);

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
            feature,
            label,
            target: '_self',
            url: null,
          });
          return;
        }

        router.push(href);
        emit('click', {
          feature,
          label,
          target: '_self',
          url: href,
        });
      },
    ),
  };
}
