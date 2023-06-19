import type { Props as WrapperProps } from '../../../components/wrapper';
import type Breadcrumb from '../../../types/breadcrumb';

const BREADCRUMBS: readonly Breadcrumb[] = [
  {
    children: 'Sprite sheet to GIF',
    path: '/spritesheet2gif',
  },
];

export default function useSpritesheet2GifWrapperProps(): Partial<WrapperProps> {
  return {
    breadcrumbs: BREADCRUMBS,
  };
}
