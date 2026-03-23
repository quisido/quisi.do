import type { ReactElement } from 'react';

export interface ButtonProps {
  readonly children: string;
  readonly onClick: VoidFunction;
}

export default function Button({
  children,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
