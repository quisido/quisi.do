import mapPathToAlternates from '../utils/map-path-to-alternates.js';
import { AUTHOR_QUISIDO } from './author-quisido.js';
import { FORMAT_DETECTION } from './format-detection.js';
import { KEYWORDS } from './keywords.js';
import { ROBOTS_INFO } from './robots-info.js';

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
  manifest: '/quisido.webmanifest',
  metadataBase: new URL('/', 'https://quisi.do'),
  publisher: 'quisi.do',
  referrer: 'no-referrer-when-downgrade',
  robots: ROBOTS_INFO,
  title: 'quisi.do',

  appLinks: {
    web: {
      url: 'https://quisi.do/',
    },
  },

  openGraph: {
    /*
     * Audio: OGAudio | Array<OGAudio>
     * countryName: string
     */
    description: 'quisi.do',
    // Determiner: 'a' | 'an' | 'the' | 'auto' | ''
    emails: ['open-graph@quisi.do'],
    // FirstName: 'Mr.',
    gender: 'male',
    // Images: OGImage | Array<OGImage>
    // LastName: 'quisi.do',
    locale: 'en-US',
    siteName: 'quisi.do',
    title: 'quisi.do',
    type: 'profile',
    url: 'https://quisi.do/',
    // Videos: OGVideo | Array<OGVideo>
  },

  twitter: {
    creatorId: 'elonmusk',
    description: 'quisi.do',
    // Images: TwitterImage | Array<TwitterImage>;
    siteId: 'quisi.do',

    // This refers to the title of the page, not the title of the website.
    title: 'quisi.do',
  },
};
