import routesMetadata from './utils/route-metadata';

const routesMetadataEntries = Object.entries(routesMetadata);

export default {
  pages: routesMetadataEntries.reduce(
    (pages, [ path, metadata ]) => {
      if (path === '/') {
        return pages;
      }
      return {
        ...pages,
        [path.replace(/^\//, '').replace(/\/$/, '')]: {
          description: metadata.description,
          keywords: metadata.keywords,
          title: metadata.title,
        },
      };
    },
    Object.create(null),
  ),
};
