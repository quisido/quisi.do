import type { ComponentType } from 'react';
import { lazy } from 'react';
import withWrapper from '../../hocs/with-wrapper';
import useWrapperProps from './hooks/use-wrapper';

const SpriteSheet2Gif: ComponentType = lazy(
  async (): Promise<Record<'default', ComponentType>> =>
    import('./spritesheet2gif.view'),
);

export default withWrapper(SpriteSheet2Gif, useWrapperProps);
