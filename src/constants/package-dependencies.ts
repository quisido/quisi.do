/*
Package dependencies define which of my own packages depend on my own packages.
  These are used to calculate "direct" downloads. For example, ReactN depends
  on use-force-update. This means that every 1 download of ReactN also results
  in 1 download of use-force-update. By substracting the download count of
  ReactN from the download count of use-force-update, we can calculate the total
  number of downloads requested for use-force-update directly.
*/

const PACKAGE_DEPENDENCIES: Map<string, string[]> = new Map([
  ['awsui-dark-mode', ['awsui-theme']],
  ['fetch-suspense', ['deep-equal']],
  ['rainbow-gradient', ['@charlesstover/hsl2rgb']],
  ['react-capsule', ['use-force-update']],
  ['react-rainbow-text', ['rainbow-gradient']],
  ['react-sparkline-svg', ['sparkline-svg']],
  ['reactn', ['use-force-update']],
  ['relative-timestamp', ['use-force-update']],
  ['use-react-router', ['use-force-update']],
]);

export default PACKAGE_DEPENDENCIES;
