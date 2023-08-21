import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      lastModified: new Date(),
      url: 'https://charlesstover.com/',
    },

    {
      lastModified: new Date(),
      url: 'https://charlesstover.com/dashboard/',
    },

    {
      lastModified: new Date(),
      url: 'https://charlesstover.com/packages/',
    },

    {
      lastModified: new Date(),
      url: 'https://charlesstover.com/publications/',
    },
  ];
}
