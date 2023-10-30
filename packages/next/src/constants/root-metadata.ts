import { type Metadata } from 'next';
import mapPathToAlternates from '../utils/map-path-to-alternates';
import AUTHOR_QUISIDO from './author-quisido';
import FORMAT_DETECTION from './format-detection';
import KEYWORDS from './keywords';
// import ROBOTS_INFO from './robots-info';
import THEME_COLOR_DESCRIPTORS from './theme-color-descriptors';

/**
 * TODO: Validate these against the standard documented on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export default {
  alternates: mapPathToAlternates('/'),
  applicationName: 'quisi.do',
  authors: [AUTHOR_QUISIDO],
  creator: 'Charles Quisido',
  description: 'portfolio for Charles Quisido',
  formatDetection: FORMAT_DETECTION,
  generator: null,
  keywords: [...KEYWORDS],
  manifest: '/manifest.json',
  metadataBase: new URL('/', 'https://quisi.do'),
  // publisher: 'Quisido',
  referrer: 'no-referrer-when-downgrade',
  // robots: ROBOTS_INFO,
  title: 'quisi.do',

  appLinks: {
    web: {
      url: 'https://quisi.do/',
    },
  },

  openGraph: {
    // audio: OGAudio | Array<OGAudio>
    // countryName: string
    description: 'portfolio of Charles Quisido',
    // determiner: 'a' | 'an' | 'the' | 'auto' | ''
    emails: ['open-graph@quisi.do'],
    firstName: 'Charles',
    gender: 'male',
    // images: OGImage | Array<OGImage>
    lastName: 'Quisido',
    locale: 'en-US',
    siteName: 'quisi.do',
    title: 'quisi.do',
    type: 'profile',
    url: 'https://quisi.do/',
    // videos: OGVideo | Array<OGVideo>
  },

  twitter: {
    creatorId: 'CharlesStover',
    description: 'portfolio of Charles Quisido',
    // images: TwitterImage | Array<TwitterImage>;
    siteId: 'CharlesStover',
    title: 'quisi.do', // <-- title of the page, not the website
  },
} satisfies Metadata;
