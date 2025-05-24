const DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS: readonly string[] = [
  '**/.git/',
  '**/.idea/',
  '**/.nyc_output/',
  '**/build/',
  '**/coverage/',
  '**/cypress/coverage/',
  '**/cypress/downloads/',
  '**/cypress/screenshots/',
  '**/cypress/videos/',
  '**/dist/',
  '**/node_modules/',
  '**/sarif/',
  '**/.attach_pid*',
  '**/*.cpuprofile',
  '**/*.tsbuildinfo',
  '**/lighthouse.report.*',
  '**/package-lock.json',
];

export default DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS;
