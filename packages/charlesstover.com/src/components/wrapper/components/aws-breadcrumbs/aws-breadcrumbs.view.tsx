import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import BreadcrumbGroup from '@awsui/components-react/breadcrumb-group';
import type { ReactElement } from 'react';
import type Breadcrumb from '../../../../types/breadcrumb';
import filterByDefined from '../../../../utils/filter-by-defined';
import useAwsWrapperBreadcrumbs from './aws-breadcrumbs.hook';

interface Props {
  readonly children: readonly Readonly<Breadcrumb>[];
}

export default function AwsWrapperBreadcrumbs({
  children,
}: Readonly<Props>): ReactElement {
  const { ariaLabel, handleFollow, items } = useAwsWrapperBreadcrumbs(children);

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<BreadcrumbGroupProps, 'ariaLabel'> = {};
  if (filterByDefined(ariaLabel)) {
    optionalProps.ariaLabel = ariaLabel;
  }

  return (
    <BreadcrumbGroup items={items} onFollow={handleFollow} {...optionalProps} />
  );
}
