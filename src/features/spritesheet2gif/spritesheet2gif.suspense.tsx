import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import Lazy from './spritesheet2gif.lazy';

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
      <Lazy />
    </Suspense>
  );
}
