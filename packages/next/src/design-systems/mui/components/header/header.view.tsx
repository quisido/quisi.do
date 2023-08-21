import type { ReactElement } from 'react';
import type { Props } from '../../../../components/header';
import validateString from '../../../../utils/validate-string';
import Div from '../div';
import styles from './header.module.scss';

const headingClassName: string = validateString(styles.heading);

export default function MuiHeader({
  actions,
  children,
}: Readonly<Props>): ReactElement {
  return (
    <Div display="flex" flexDirection="row">
      <h2 className={headingClassName}>{children}</h2>
      {typeof actions !== 'undefined' && <div>{actions}</div>}
    </Div>
  );
}
