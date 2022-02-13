import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import useSpriteSheet2Gif from './spritesheet2gif.hook';
import type ContentProps from './types/content-props';

const Content: ComponentType<ContentProps> = lazy(
  async () => import('./components/content'),
);

export default function SpriteSheet2Gif(): ReactElement {
  const {
    Help,
    breadcrumbs,
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
      breadcrumbs={breadcrumbs}
      contentType="wizard"
      fallback={<I18n>Loading spritesheet to GIF converter</I18n>}
      notifications={notifications}
      onToolsChange={handleHelpChange}
      toolsHide={false}
      toolsOpen={helpOpen}
    >
      <Content
        onError={handleError}
        onErrorDismiss={handleErrorDismiss}
        onHelpDismiss={handleHelpDismiss}
        onHelpRequest={handleHelpRequest}
      />
    </Wrapper>
  );
}
