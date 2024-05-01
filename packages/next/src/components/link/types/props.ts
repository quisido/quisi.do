import { type ReactNode } from 'react';

interface BaseProps {
  readonly children?: ReactNode;
  readonly className?: string | undefined;
  readonly feature: string; // Used for tracking events
  readonly label?: string | undefined;
  readonly title: string;
}

interface HrefProps {
  readonly href: string;
  readonly onClick?: (() => boolean) | undefined;
}

interface OnClickProps {
  readonly href?: string | undefined;
  readonly onClick: () => undefined;
}

export type Props = BaseProps & (HrefProps | OnClickProps);
