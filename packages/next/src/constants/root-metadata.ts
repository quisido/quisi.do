import type { Metadata } from 'next';
import mapPathToAlternates from '../utils/map-path-to-alternates';
import AUTHOR_CHARLES_STOVER from './author-charles-stover';
import FORMAT_DETECTION from './format-detection';
import KEYWORDS from './keywords';
// import ROBOTS_INFO from './robots-info';
import THEME_COLOR_DESCRIPTORS from './theme-color-descriptors';
import VIEWPORT from './viewport';

/**
 * TODO: Validate these against the standard documented on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export default {
  alternates: mapPathToAlternates('/'),
  applicationName: 'Charles Stover',
  authors: [AUTHOR_CHARLES_STOVER],
  colorScheme: 'dark light',
  creator: 'Charles Stover',
  description: 'portfolio for Charles Stover',
  formatDetection: FORMAT_DETECTION,
  generator: null,
  keywords: [...KEYWORDS],
  manifest: '/manifest.json',
  metadataBase: new URL('/', 'https://charlesstover.com'),
  publisher: 'Charles Stover',
  referrer: 'no-referrer-when-downgrade',
  // robots: ROBOTS_INFO,
  themeColor: [...THEME_COLOR_DESCRIPTORS],
  title: 'Charles Stover',
  viewport: VIEWPORT,

  appLinks: {
    web: {
      url: 'https://charlesstover.com/',
    },
  },

  openGraph: {
    // audio: OGAudio | Array<OGAudio>
    // countryName: string
    description: 'portfolio of Charles Stover',
    // determiner: 'a' | 'an' | 'the' | 'auto' | ''
    emails: ['open-graph@charlesstover.com'],
    firstName: 'Charles',
    gender: 'male',
    // images: OGImage | Array<OGImage>
    lastName: 'Stover',
    locale: 'en-US',
    siteName: 'CharlesStover.com',
    title: 'Charles Stover',
    type: 'profile',
    url: 'https://charlesstover.com/',
    // videos: OGVideo | Array<OGVideo>
  },

  twitter: {
    creatorId: 'CharlesStover',
    description: 'portfolio of Charles Stover',
    // images: TwitterImage | Array<TwitterImage>;
    siteId: 'CharlesStover',
    title: 'Charles Stover', // <-- title of content, not site
  },
} satisfies Metadata;
