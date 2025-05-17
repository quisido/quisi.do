const IGNORED_REPORT_KEYS = new Set([
  'configSettings',
  'environment',
  'finalUrl',
  'gatherMode',
  'i18n',
  'requestedUrl',
  'timing',
  'userAgent',
]);

export default function reduceResultEntriesToDashboard(
  dashboard,
  [key, value],
) {
  if (IGNORED_REPORT_KEYS.has(key)) {
    return dashboard;
  }

  return {
    ...dashboard,
    [key]: value,
  };
}
