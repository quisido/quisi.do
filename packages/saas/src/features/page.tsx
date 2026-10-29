import { type PropsWithChildren, type ReactElement } from 'react';

import { Document, Link } from '../components/design-system.js';
import Authentication from './header-authentication.jsx';
import classes from './page.module.scss';

const YEAR: number = new Date().getFullYear();

export default function Page({ children }: PropsWithChildren): ReactElement {
  return (
    <Document
      banner={
        <div className={classes['banner']}>
          <Link href="/">quisi.do</Link>
          <div>
            <Authentication />
          </div>
        </div>
      }
      contentInfo={<span>&copy; {YEAR} quisi.do</span>}
    >
      {children}
    </Document>
  );
}
