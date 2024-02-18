import type { ReactElement } from 'react';
import type { Props } from '../../components/header/index.js';

export default function Header({ actions, children }: Props): ReactElement {
  return (
    <header>
      <h2>{children}</h2>
      {typeof actions !== 'undefined' && <div>{actions}</div>}
    </header>
  );
}
