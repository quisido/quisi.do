import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type Breadcrumb from '../../types/breadcrumb';
import mapBreadcrumbToAwsBreadcrumb from './breadcrumbs.util.map-breadcrumb-to-aws-breadcrumb';

export default function mapBreadcrumbsToAwsBreadcrumbs(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): readonly BreadcrumbGroupProps.Item[] {
  return breadcrumbs.map(mapBreadcrumbToAwsBreadcrumb);
}
