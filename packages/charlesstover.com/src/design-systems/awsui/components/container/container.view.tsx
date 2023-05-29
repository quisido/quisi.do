import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/container';
import Div from '../div';

export default function AwsuiContainer({
  actions,
  children,
  footer,
  header,
  headerClassName,
  marginTop,
}: Readonly<Props>): ReactElement {
  return (
    <Div marginTop={marginTop}>
      <Container
        footer={footer}
        header={
          <Div className={headerClassName}>
            <Header actions={actions}>{header}</Header>
          </Div>
        }
      >
        {children}
      </Container>
    </Div>
  );
}
