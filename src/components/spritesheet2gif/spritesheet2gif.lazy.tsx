import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import { ReactElement, Suspense, lazy } from 'react';

// TODO: Lazy should only apply to the contents of <AppLayout />, so dynamic
//   state like breadcrumbs, notifications, and tools needs to be set using
//   an event listener on the child node.

const SpriteSheet2GifLazy = lazy(() => import('./spritesheet2gif.view'));

export default function SpriteSheet2GifSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box>
          <Spinner />
          <I18n>Loading spritesheet to GIF converter</I18n>
        </Box>
      }
    >
      <SpriteSheet2GifLazy />
    </Suspense>
  );
}
