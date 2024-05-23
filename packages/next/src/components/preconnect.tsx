import { type ReactElement } from 'react';

interface Props {
  readonly as?: string | undefined;
  readonly children: string;
  readonly cors?: boolean | undefined;
}

export default function Preconnect({
  as,
  children,
  cors = false,
}: Props): ReactElement {
  return (
    <link
      as={as}
      crossOrigin={cors ? 'anonymous' : undefined}
      href={children}
      rel="preconnect"
    />
  );
}
