import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../components/div';
import Span from '../../components/span';
import validateString from '../../utils/validate-string';
import Link from './components/link';
import useFooter from './wrapper-footer.hook';
import styles from './wrapper-footer.module.scss';

const rootClassName: string = validateString(styles.root);
const NONE = 0;

export default function WrapperFooter(): ReactElement {
  const { features } = useFooter();

  return (
    <Div className={rootClassName} marginTop="large">
      {features.length > NONE && (
        <Span color="label" size="small">
          {features.join(', ')}
        </Span>
      )}
      <Span color="label">
        <Link />
      </Span>
    </Div>
  );
}
