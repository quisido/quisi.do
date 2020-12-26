import { ReactNode } from 'react';

export default function emphasizeString(
  str: string,
  index: number,
  length: number,
): ReactNode {
  return (
    <>
      {str.substring(0, index)}
      <strong>{str.substring(index, index + length)}</strong>
      {str.substring(index + length)}
    </>
  );
}
