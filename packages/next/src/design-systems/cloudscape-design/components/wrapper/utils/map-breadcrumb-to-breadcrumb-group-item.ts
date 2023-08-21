import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import type Breadcrumb from '../../../../../types/breadcrumb';

export default function mapBreadcrumbToCloudscapeBreadcrumbGroupIte({
  children,
  path,
}: Readonly<Breadcrumb>): BreadcrumbGroupProps.Item {
  return {
    href: path,
    text: children,
  };
}
