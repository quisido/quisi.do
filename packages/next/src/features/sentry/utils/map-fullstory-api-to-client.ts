import type { FullStoryClient } from '@sentry/fullstory/dist/types';
import type { FSApi } from 'fullstory-react';

export default function mapFullStoryApiToClient(FS: FSApi): FullStoryClient {
  return {
    event(name: string, properties: Record<string, unknown>): void {
      FS('trackEvent', {
        name,
        properties,
      });
    },
    getCurrentSessionURL(now = false): string | null {
      return (
        FS('getSession', {
          format: now ? 'url.now' : 'url',
        }) ?? null
      );
    },
  };
}
