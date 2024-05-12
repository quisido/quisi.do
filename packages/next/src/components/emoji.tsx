import { type PropsWithChildren, type ReactElement } from 'react';

export default function Emoji({ children }: PropsWithChildren): ReactElement {
  return <span style={{ fontFamily: 'Noto Color Emoji' }}>{children}</span>;
}
