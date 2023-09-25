import { addBreadcrumb } from '@sentry/react';

export default function useAddBreadcrumb(): typeof addBreadcrumb {
  return addBreadcrumb;
}
