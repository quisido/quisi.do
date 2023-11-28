import { type ReactElement } from 'react';

interface Props {
  readonly children: string;
  readonly index: number;
  readonly length: number;
}

const NOT_FOUND = -1;
const START = 0;

export default function EmphasizeSubstring({
  children,
  index,
  length,
}: Props): ReactElement {
  if (index === NOT_FOUND) {
    return <>{children}</>;
  }

  const end: number = index + length;
  return (
    <>
      {children.substring(START, index)}
      <strong>{children.substring(index, end)}</strong>
      {children.substring(end)}
    </>
  );
}
