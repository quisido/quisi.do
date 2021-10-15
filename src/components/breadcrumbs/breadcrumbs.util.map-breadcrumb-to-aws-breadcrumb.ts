import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type Breadcrumb from '../../types/breadcrumb';

export default function mapBreadcrumbToAwsBreadcrumb({
  children,
  path,
}: Readonly<Breadcrumb>): BreadcrumbGroupProps.Item {
  return {
    href: path,
    text: children,
  };
}
