'use client';

import { useFullStory } from 'fullstory-react';

export default function FullStory(): null {
  useFullStory({
    devMode: process.env.NODE_ENV !== 'production',
    orgId: 'o-1X4ZHB-na1',
    startCaptureManually: false,
  });

  return null;
}
