import { type MetadataRoute } from 'next';
import Locale from '../constants/locale.js';

const NOW: Date = new Date();

const mapLocaleToPath = (locale: Locale): string => {
  if (locale === Locale.English) {
    return '';
  }
  return `/${locale}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const files: MetadataRoute.Sitemap = [];

  for (const locale of Object.values(Locale)) {
    const localePath: string = mapLocaleToPath(locale);
    const mapPathToUrl = (path: string): string =>
      `https://quisi.do${localePath}${path}`;

    files.push(
      {
        lastModified: NOW,
        url: mapPathToUrl('/'),
      },

      {
        lastModified: NOW,
        url: mapPathToUrl('/charities/'),
      },

      {
        lastModified: NOW,
        url: mapPathToUrl('/cookies/'),
      },

      {
        lastModified: NOW,
        url: mapPathToUrl('/dashboard/'),
      },

      {
        lastModified: NOW,
        url: mapPathToUrl('/privacy/'),
      },

      {
        lastModified: NOW,
        url: mapPathToUrl('/tos/'),
      },
    );
  }

  return files;
}
