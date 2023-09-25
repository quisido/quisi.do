'use client';

import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime.js';
import { useRouter } from 'next/navigation.js';
import useEffectEvent from './use-effect-event.js';

export interface State<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item,
> {
  readonly handleFollow: (
    event: Readonly<
      CustomEvent<Readonly<BreadcrumbGroupProps.ClickDetail<Item>>>
    >,
  ) => void;
}

export default function useBreadcrumbGroup<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item,
>(): State<Item> {
  // Contexts
  const router: AppRouterInstance = useRouter();

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
