import { type fullStoryIntegration } from '@sentry/fullstory';

type Options = Parameters<typeof fullStoryIntegration>[1];

type FullStoryClient = Options['client'];

export type SentryFullStoryClient = FullStoryClient;
