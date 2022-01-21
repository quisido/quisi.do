import type { ReactElement } from 'react';
import Div from '../../../../components/div';
import Span from '../../../../components/span';
import validateString from '../../../../utils/validate-string';
import Link from '../../components/footer-link';
import styles from './footer.module.scss';

const rootClassName: string = validateString(styles.root);

export default function Footer(): ReactElement {
  return (
    <Div className={rootClassName} marginTop="large">
      <Span color="label">&copy; Charles Stover</Span>
      <Span color="label">
        <Link />
      </Span>
    </Div>
  );
}
