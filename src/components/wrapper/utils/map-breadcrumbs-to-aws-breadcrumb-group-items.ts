import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type Breadcrumb from '../../../types/breadcrumb';
import mapBreadcrumbToAwsBreadcrumbGroupItem from './map-breadcrumb-to-aws-breadcrumb-group-item';

export default function mapBreadcrumbsToAwsBreadcrumbGroupItems(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): readonly BreadcrumbGroupProps.Item[] {
  return breadcrumbs.map(mapBreadcrumbToAwsBreadcrumbGroupItem);
}
