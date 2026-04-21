import type { PropsWithChildren, ReactElement } from 'react';
import Document from '../design-systems/template/document.jsx';

const YEAR: number = new Date().getFullYear();

export default function Page({ children }: PropsWithChildren): ReactElement {
  return (
    <Document
      banner={<a href="/">quisi.do</a>}
      contentInfo={<>&copy; {YEAR} quisi.do</>}
    >
      {children}
    </Document>
  );
}
