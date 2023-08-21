import type { PropsWithChildren, ReactElement } from 'react';
import Wrapper from '../../../components/wrapper';
import type Breadcrumb from '../../../types/breadcrumb';

const BREADCRUMBS: readonly Breadcrumb[] = [
  {
    children: 'Sprite sheet to GIF',
    path: '/spritesheet2gif',
  },
];

export default function SpriteSheet2GIFLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return <Wrapper breadcrumbs={BREADCRUMBS}>{children}</Wrapper>;
}
