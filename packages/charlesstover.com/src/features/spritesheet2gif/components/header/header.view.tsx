import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';

interface Props {
  readonly onInfoFollow: VoidFunction;
}

export default function SpriteSheet2GifHeader({
  onInfoFollow,
}: Props): ReactElement {
  return (
    <>
      Animate a sprite sheet{' '}
      <Link ariaLabel="Info" onFollow={onInfoFollow} variant="info">
        Info
      </Link>
    </>
  );
}
