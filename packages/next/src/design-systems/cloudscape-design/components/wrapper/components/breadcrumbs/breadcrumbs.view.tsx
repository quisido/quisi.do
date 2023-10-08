import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import type { ReactElement } from 'react';
import type Breadcrumb from '../../../../../../types/breadcrumb';
import useBreadcrumbs from './breadcrumbs.hook';

interface Props {
  readonly children: readonly Readonly<Breadcrumb>[];
}

export default function CloudscapeDesignWrapperBreadcrumbs({
  children,
}: Props): ReactElement {
  const { ariaLabel, handleFollow, items } = useBreadcrumbs(children);

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional
  //   properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<BreadcrumbGroupProps, 'ariaLabel'> = {};
  if (typeof ariaLabel !== 'undefined') {
    optionalProps.ariaLabel = ariaLabel;
  }

  return (
    <BreadcrumbGroup items={items} onFollow={handleFollow} {...optionalProps} />
  );
}
