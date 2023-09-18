'use client';

import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import useEffectEvent from './use-effect-event';

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
