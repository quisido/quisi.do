import { type Metadata } from 'next';
import mapPathToAlternates from '../utils/map-path-to-alternates';
import AUTHOR_QUISIDO from './author-quisido';
import FORMAT_DETECTION from './format-detection';
import KEYWORDS from './keywords';
// import ROBOTS_INFO from './robots-info';
// import THEME_COLOR_DESCRIPTORS from './theme-color-descriptors';

/**
 * TODO: Validate these against the standard documented on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export default {
  alternates: mapPathToAlternates('/'),
  applicationName: 'quisi.do',
  authors: [AUTHOR_QUISIDO],
  creator: 'quisi.do',
  description: 'quisi.do',
  formatDetection: FORMAT_DETECTION,
  generator: null,
  keywords: [...KEYWORDS],
  manifest: '/manifest.json',
  metadataBase: new URL('/', 'https://quisi.do'),
  // publisher: 'quisi.do',
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
    description: 'quisi.do',
    // determiner: 'a' | 'an' | 'the' | 'auto' | ''
    emails: ['open-graph@quisi.do'],
    firstName: 'quisi',
    gender: 'male',
    // images: OGImage | Array<OGImage>
    lastName: '.do',
    locale: 'en-US',
    siteName: 'quisi.do',
    title: 'quisi.do',
    type: 'profile',
    url: 'https://quisi.do/',
    // videos: OGVideo | Array<OGVideo>
  },

  twitter: {
    creatorId: 'elonmusk',
    description: 'quisi.do',
    // images: TwitterImage | Array<TwitterImage>;
    siteId: 'quisi.do',
    title: 'quisi.do', // <-- title of the page, not the website
  },
} satisfies Metadata;
