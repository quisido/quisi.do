const TRAILING_ROOT_KEYS: readonly string[] = [
  'scripts',

  'bugs',
  'exports',
  'funding',
  'publishConfig',
  'repository',
  'workspaces',

  'dependencies',
  'devDependencies',
  'peerDependencies',
];

export const PACKAGE_JSON_SORT_KEYS_OPTIONS = [
  {
    allowLineSeparatedGroups: false,
    order: [
      'name',
      'version',
      {
        keyPattern: `^(?!(?:${TRAILING_ROOT_KEYS.join('|')})$)`,
        order: { type: 'asc' },
      },
      ...TRAILING_ROOT_KEYS,
    ],
    pathPattern: '^$',
  },

  {
    allowLineSeparatedGroups: false,
    order: [
      'types',
      { keyPattern: '^(?!(default)$)', order: { type: 'asc' } },
      'default',
    ],
    pathPattern: 'exports',
  },

  {
    allowLineSeparatedGroups: false,
    order: ['build', 'start', 'test', { order: { type: 'asc' } }],
    pathPattern: 'scripts',
  },

  {
    order: { type: 'asc' },
    pathPattern: '.*',
  },
];
