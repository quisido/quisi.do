import type { ReactElement } from 'react';
import Div from '../../components/div';
import filterByDefined from '../../utils/filter-by-defined';
import validateString from '../../utils/validate-string';
import type Props from './types/props';
import styles from './header.mui.module.scss';

const headingClassName: string = validateString(styles.heading);

export default function MuiHeader({
  actions,
  children,
}: Readonly<Props>): ReactElement {
  return (
    <Div display="flex" flexDirection="row">
      <h2 className={headingClassName}>{children}</h2>
      {filterByDefined(actions) && <div>{actions}</div>}
    </Div>
  );
}
