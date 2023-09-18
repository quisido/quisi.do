import type { Breadcrumb } from '@sentry/react';
import { addBreadcrumb } from '@sentry/react';

export default function useAddBreadcrumb(): (
  breadcrumb: Readonly<Breadcrumb>,
) => void {
  return addBreadcrumb;
}
