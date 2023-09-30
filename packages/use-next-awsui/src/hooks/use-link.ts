'use client';

import type { LinkProps } from '@awsui/components-react/link';
import { useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import useEffectEvent from './use-effect-event.js';

interface Props {
  readonly href?: string | undefined;
}

export interface State {
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>,
  ) => void;
}

const DEFAULT_PROPS: Props = {};

export default function useLink({ href }: Props = DEFAULT_PROPS): State {
  // Contexts
  const router = useRouter();

  useEffect((): void => {
    if (typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, router]);

  return {
    handleFollow: useEffectEvent(
      (e: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>): void => {
        if (
          e.detail.external === true ||
          typeof e.detail.href === 'undefined' ||
          e.detail.target === '_blank'
        ) {
          return;
        }

        e.preventDefault();
        router.push(e.detail.href);
      },
    ),
  };
}
