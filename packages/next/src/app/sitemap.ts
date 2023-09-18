import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      lastModified: new Date(),
      url: 'https://quisi.do/',
    },

    {
      lastModified: new Date(),
      url: 'https://quisi.do/dashboard/',
    },

    {
      lastModified: new Date(),
      url: 'https://quisi.do/packages/',
    },

    {
      lastModified: new Date(),
      url: 'https://quisi.do/publications/',
    },

    {
      lastModified: new Date(),
      url: 'https://quisi.do/quotes/',
    },
  ];
}
