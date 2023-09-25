'use client';

import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { useRouter } from 'next/navigation.js';
import useEffectEvent from './use-effect-event.js';
import { useEffect } from 'react';

export interface State<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item,
> {
  readonly handleFollow: (
    event: Readonly<
      CustomEvent<Readonly<BreadcrumbGroupProps.ClickDetail<Item>>>
    >,
  ) => void;
}

const EMPTY_ARRAY: readonly never[] = [];

export default function useBreadcrumbGroup<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item,
>(paths: Iterable<string> = EMPTY_ARRAY): State<Item> {
  // Contexts
  const router = useRouter();

  useEffect((): void => {
    for (const path of paths) {
      router.prefetch(path);
    }
  }, [paths, router]);

  // States
  return {
    handleFollow: useEffectEvent(
      (
        e: Readonly<
          CustomEvent<Readonly<BreadcrumbGroupProps.ClickDetail<Item>>>
        >,
      ): void => {
        e.preventDefault();
        router.push(e.detail.href);
      },
    ),
  };
}
