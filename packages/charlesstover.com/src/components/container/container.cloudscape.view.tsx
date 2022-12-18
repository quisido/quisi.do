import Container from '@cloudscape-design/components/container';
import type { HeaderProps } from '@cloudscape-design/components/header';
import Header from '@cloudscape-design/components/header';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';
import styles from './container.cloudscape.module.scss';
import validateString from '../../utils/validate-string';

const rootClassName: string = validateString(styles.root);

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
    <div className={rootClassName}>
      <Container
        footer={footer}
        header={
          <Header actions={actions} {...optionalHeaderProps}>
            {header}
          </Header>
        }
        variant="stacked"
      >
        {children}
      </Container>
    </div>
  );
}
