import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Wrapper from '../../components/wrapper';
import type Breadcrumb from '../../types/breadcrumb';
import useSpriteSheet2Gif from './spritesheet2gif.root.hook';
import type ContentsProps from './types/contents-props';

const BREADCRUMBS: readonly Breadcrumb[] = [
  {
    children: 'Sprite sheet to GIF converter',
    path: '/spritesheet2gif',
  },
];

const Contents: ComponentType<ContentsProps> = lazy(
  async () => import('./spritesheet2gif.contents.view'),
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
      notifications={notifications}
      onToolsChange={handleHelpChange}
      toolsHide={false}
      toolsOpen={helpOpen}
    >
      <Suspense
        fallback={
          <Box>
            <Spinner />
            <I18n>Loading spritesheet to GIF converter</I18n>
          </Box>
        }
      >
        <Contents
          onError={handleError}
          onErrorDismiss={handleErrorDismiss}
          onHelpDismiss={handleHelpDismiss}
          onHelpRequest={handleHelpRequest}
        />
      </Suspense>
    </Wrapper>
  );
}
