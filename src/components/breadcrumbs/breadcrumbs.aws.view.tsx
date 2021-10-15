import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import BreadcrumbGroup from '@awsui/components-react/breadcrumb-group';
import type { ReactElement } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import useAwsBreadcrumbs from './breadcrumbs.aws.hook';

interface Props {
  readonly children: readonly Readonly<Breadcrumb>[];
}

export default function AwsBreadcrumbs({
  children,
}: Readonly<Props>): ReactElement {
  const { ariaLabel, handleFollow, items } = useAwsBreadcrumbs(children);

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<BreadcrumbGroupProps, 'ariaLabel'> = {};
  if (typeof ariaLabel !== 'undefined') {
    optionalProps.ariaLabel = ariaLabel;
  }

  return (
    <BreadcrumbGroup items={items} onFollow={handleFollow} {...optionalProps} />
  );
}
