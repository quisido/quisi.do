import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/container';
import validateString from '../../../../utils/validate-string';
import Div from '../div';
import Contents from './components/contents';
import styles from './container.module.scss';

const rootClassName: string = validateString(styles.root);

export default function CloudscapeDesignContainer({
  actions,
  children,
  className,
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
        <Contents className={className}>{children}</Contents>
      </Container>
    </Div>
  );
}
