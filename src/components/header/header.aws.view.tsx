import type { HeaderProps } from '@awsui/components-react/header';
import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function AwsHeader({
  actions,
  children,
  className,
}: Readonly<Props>): ReactElement {
  const optionalProps: HeaderProps = {};
  if (filterByDefined(className)) {
    optionalProps.className = className;
  }

  return (
    <Header actions={actions} {...optionalProps}>
      {children}
    </Header>
  );
}
