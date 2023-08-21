import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import type Breadcrumb from '../../../../../types/breadcrumb';
import mapBreadcrumbToBreadcrumbGroupItem from './map-breadcrumb-to-breadcrumb-group-item';

export default function mapBreadcrumbsToCloudscapeBreadcrumbGroupItems(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): readonly BreadcrumbGroupProps.Item[] {
  return breadcrumbs.map(mapBreadcrumbToBreadcrumbGroupItem);
}
