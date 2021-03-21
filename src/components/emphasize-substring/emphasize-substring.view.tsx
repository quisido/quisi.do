import { ReactElement } from 'react';

interface Props {
  children: string;
  index: number;
  length: number;
}

export default function EmphasizeSubstring({
  children,
  index,
  length,
}: Props): ReactElement {
  if (index === -1) {
    return <>{children}</>;
  }

  return (
    <>
      {children.substring(0, index)}
      <strong>{children.substring(index, index + length)}</strong>
      {children.substring(index + length)}
    </>
  );
}
