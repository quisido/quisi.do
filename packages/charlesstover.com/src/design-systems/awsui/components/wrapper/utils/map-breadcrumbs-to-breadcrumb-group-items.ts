import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type Breadcrumb from '../../../../../types/breadcrumb';
import mapBreadcrumbToBreadcrumbGroupItem from './map-breadcrumb-to-breadcrumb-group-item';

export default function mapBreadcrumbsToAwsuiBreadcrumbGroupItems(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): readonly BreadcrumbGroupProps.Item[] {
  return breadcrumbs.map(mapBreadcrumbToBreadcrumbGroupItem);
}
