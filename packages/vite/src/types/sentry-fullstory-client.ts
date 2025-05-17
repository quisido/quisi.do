import { type fullStoryIntegration } from '@sentry/fullstory';

type Options = Parameters<typeof fullStoryIntegration>[1];

type FullstoryClient = Options['client'];

export type SentryFullstoryClient = FullstoryClient;
