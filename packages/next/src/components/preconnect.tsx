import { type ReactElement } from 'react';

interface Props {
  readonly children: string;
  readonly cors?: boolean | undefined;
}

export default function Preconnect({
  children,
  cors = false,
}: Props): ReactElement {
  return (
    <link
      crossOrigin={cors ? 'anonymous' : undefined}
      href={children}
      rel="preconnect"
    />
  );
}
