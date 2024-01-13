import SentryFullStory from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import type { FSApi } from 'fullstory-react';
import mapFullStoryApiToClient from './map-fullstory-api-to-client.js';

export default function mapFullStoryApiToIntegration(FS: FSApi): Integration {
  return new SentryFullStory('quisido', {
    client: mapFullStoryApiToClient(FS),
  });
}
