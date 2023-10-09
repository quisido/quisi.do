import BreadcrumbGroup, type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import  { type ReactElement } from 'react';
import type Breadcrumb from '../../../../../../types/breadcrumb';
import useBreadcrumbs from './breadcrumbs.hook';

interface Props {
  readonly children: readonly Breadcrumb[];
}

export default function AwsuiWrapperBreadcrumbs({
  children,
}: Props): ReactElement {
  const { ariaLabel, handleFollow, items } = useBreadcrumbs(children);

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
