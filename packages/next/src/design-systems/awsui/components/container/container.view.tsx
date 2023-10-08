import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/container';
import Div from '../div';
import Contents from './components/contents';

export default function AwsuiContainer({
  actions,
  children,
  className,
  footer,
  header,
  headerClassName,
  marginTop,
  subheader,
}: Props): ReactElement {
  return (
    <Div marginTop={marginTop}>
      <Container
        footer={footer}
        header={
          <Div className={headerClassName}>
            <Header actions={actions}>{header}</Header>
            {subheader}
          </Div>
        }
        variant="stacked"
      >
        <Contents className={className}>{children}</Contents>
      </Container>
    </Div>
  );
}
