import Container from '@awsui/components-react/container';
import type { HeaderProps } from '@awsui/components-react/header';
import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function AwsContainer({
  actions,
  children,
  footer,
  header,
  headerClassName,
}: Readonly<Props>): ReactElement {
  const optionalHeaderProps: HeaderProps = {};
  if (filterByDefined(headerClassName)) {
    optionalHeaderProps.className = headerClassName;
  }

  return (
    <Container
      footer={footer}
      header={
        <Header actions={actions} {...optionalHeaderProps}>
          {header}
        </Header>
      }
    >
      {children}
    </Container>
  );
}
