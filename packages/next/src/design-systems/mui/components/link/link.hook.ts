'use client';

import { useRouter } from 'next/navigation.js';
import { useEffect, type MouseEvent } from 'react';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import useEmit from '../../../../hooks/use-emit/index.js';
import isHrefExternal from '../../../../utils/is-href-external.js';

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
  // Contexts
  const emit = useEmit();
  const router = useRouter();

  useEffect((): void => {
    router.prefetch(href);
  }, [href, router]);

  // States
  return {
    rel: isHrefExternal(href) ? 'nofollow noopener noreferrer' : undefined,

    handleClick: useEffectEvent(
      (e: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>): void => {
        e.preventDefault();
        emit('click', {
          feature,
          label: title,
          url: href,
        });

        router.push(href);
      },
    ),
  };
}
