import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import type Breadcrumb from '../../types/breadcrumb';
import useSpriteSheet2Gif from './spritesheet2gif.hook';
import type ContentsProps from './types/contents-props';

const BREADCRUMBS: readonly Breadcrumb[] = [
  {
    children: 'Sprite sheet to GIF converter',
    path: '/spritesheet2gif',
  },
];

const Contents: ComponentType<ContentsProps> = lazy(
  async () => import('./components/contents'),
);

export default function SpriteSheet2Gif(): ReactElement {
  const {
    Help,
    handleError,
    handleErrorDismiss,
    handleHelpDismiss,
    handleHelpRequest,
    notifications,
    handleHelpChange,
    helpOpen,
  } = useSpriteSheet2Gif();

  return (
    <Wrapper
      Tools={Help}
      breadcrumbs={BREADCRUMBS}
      contentType="wizard"
      fallback={<I18n>Loading spritesheet to GIF converter</I18n>}
      notifications={notifications}
      onToolsChange={handleHelpChange}
      toolsHide={false}
      toolsOpen={helpOpen}
    >
      <Contents
        onError={handleError}
        onErrorDismiss={handleErrorDismiss}
        onHelpDismiss={handleHelpDismiss}
        onHelpRequest={handleHelpRequest}
      />
    </Wrapper>
  );
}
