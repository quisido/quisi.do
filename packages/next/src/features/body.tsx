import type { PropsWithChildren, ReactElement } from 'react';
import './body.scss';

export default function Body({ children }: PropsWithChildren): ReactElement {
  return <body>{children}</body>;
}
