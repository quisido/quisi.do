import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import type Breadcrumb from '../../../types/breadcrumb';
import mapBreadcrumbToCloudscapeBreadcrumbGroupItem from './map-breadcrumb-to-cloudscape-breadcrumb-group-item';

export default function mapBreadcrumbsToCloudscapeBreadcrumbGroupItems(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): readonly BreadcrumbGroupProps.Item[] {
  return breadcrumbs.map(mapBreadcrumbToCloudscapeBreadcrumbGroupItem);
}
