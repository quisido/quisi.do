import BreadcrumbGroup, {
  BreadcrumbGroupProps,
} from '@awsui/components-react/breadcrumb-group';
import { ReactElement } from 'react';
import useBreadcrumbs from './breadcrumbs.hook';

interface Props {
  children?: readonly BreadcrumbGroupProps.Item[];
}

const DEFAULT_CHILDREN: readonly BreadcrumbGroupProps.Item[] = Object.freeze(
  [],
);

export default function Breadcrumbs({
  children = DEFAULT_CHILDREN,
}: Props): ReactElement {
  const { ariaLabel, handleFollow, items } = useBreadcrumbs(children);

  return (
    <BreadcrumbGroup
      ariaLabel={ariaLabel}
      items={items}
      onFollow={handleFollow}
    />
  );
}
