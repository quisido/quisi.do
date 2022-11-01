import Container from '@cloudscape-design/components/container';
import type { HeaderProps } from '@cloudscape-design/components/header';
import Header from '@cloudscape-design/components/header';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function CloudscapeContainer({
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
