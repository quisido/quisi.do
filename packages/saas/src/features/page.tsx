import { type PropsWithChildren, type ReactElement } from 'react';

import { Document, Link } from '../components/design-system.js';

const YEAR: number = new Date().getFullYear();

export default function Page({ children }: PropsWithChildren): ReactElement {
  return (
    <Document
      banner={<Link href="/">quisi.do</Link>}
      contentInfo={<>&copy; {YEAR} quisi.do</>}
    >
      {children}
    </Document>
  );
}
