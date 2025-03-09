'use client';

import type * as fullstoryBrowser from '@fullstory/browser';
import type { FSApi } from '@fullstory/snippet';
import { type PropsWithChildren, type ReactElement } from 'react';
import FullstoryBrowser from '../contexts/fullstory-browser.js';
import useMockFullstoryBrowser from '../hooks/use-mock-fullstory-browser.js';
import Fullstory from './fullstory.js';

interface Props extends Partial<Omit<typeof fullstoryBrowser, 'FullStory'>> {
  readonly FullStory?: FSApi | undefined;
  readonly identityProperties?: object | undefined;
  readonly identityUid?: string | undefined;
  readonly orgId: string;
}

export default function MockFullstory({
  children,
  identityProperties,
  identityUid,
  orgId,
  ...partialFullstoryBrowser
}: PropsWithChildren<Props>): ReactElement {
  const mockFullstoryBrowser: Omit<typeof fullstoryBrowser, 'default'> =
    useMockFullstoryBrowser(partialFullstoryBrowser);

  return (
    <FullstoryBrowser.Provider value={mockFullstoryBrowser}>
      <Fullstory
        identityProperties={identityProperties}
        identityUid={identityUid}
        orgId={orgId}
      >
        {children}
      </Fullstory>
    </FullstoryBrowser.Provider>
  );
}
