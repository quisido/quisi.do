import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import type { ReactElement } from 'react';
import type Props from './types/props';
import styles from './container.cloudscape.module.scss';
import validateString from '../../utils/validate-string';
import Div from '../div';

const rootClassName: string = validateString(styles.root);

export default function CloudscapeContainer({
  actions,
  children,
  footer,
  header,
  headerClassName,
  marginTop,
}: Readonly<Props>): ReactElement {
  return (
    <Div className={rootClassName} marginTop={marginTop}>
      <Container
        footer={footer}
        header={
          <Div className={headerClassName}>
            <Header actions={actions}>{header}</Header>
          </Div>
        }
        variant="stacked"
      >
        {children}
      </Container>
    </Div>
  );
}
