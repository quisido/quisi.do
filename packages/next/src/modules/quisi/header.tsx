import type { ReactElement, ReactNode } from 'react';

export interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
}

export default function Header({ actions, children }: Props): ReactElement {
  return (
    <header>
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          lineHeight: '1rem',
          marginBottom: '1rem',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        }}
      >
        {children}
      </h2>
      {typeof actions !== 'undefined' && <div>{actions}</div>}
    </header>
  );
}
