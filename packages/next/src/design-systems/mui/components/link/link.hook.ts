'use client';

import { useRouter } from 'next/navigation.js';
import {
  type HTMLAttributeAnchorTarget,
  type MouseEvent,
  useEffect,
} from 'react';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import useEmit from '../../../../hooks/use-emit/index.js';
import isHrefBlank from '../../../../utils/is-href-blank.js';

interface Props {
  readonly feature: string;
  readonly href: string;
  readonly title: string;
}

interface State {
  readonly rel: string | undefined;
  readonly handleClick: (
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink({ feature, href, title }: Props): State {
  const isBlank: boolean = isHrefBlank(href);

  // Contexts
  const emit = useEmit();
  const router = useRouter();

  useEffect((): void => {
    if (isBlank) {
      return;
    }

    router.prefetch(href);
  }, [href, isBlank, router]);

  // States
  return {
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,

    handleClick: useEffectEvent(
      (e: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>): void => {
        e.preventDefault();
        const target: HTMLAttributeAnchorTarget = isBlank ? '_blank' : '_self';
        emit('click', {
          feature,
          label: title,
          target,
          url: href,
        });

        if (isBlank) {
          window.open(href, '_blank');
          return;
        }

        router.push(href);
      },
    ),
  };
}
