declare module '*.webmanifest' {
  const webmanifest: import('./types/web-manifest/index.js').default;
  export = webmanifest;
}
