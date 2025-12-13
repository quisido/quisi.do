export const STATIC_TSC_OPTIONS: readonly string[] = [
  '--assumeChangesOnlyAffectDirectDependencies',
  '--pretty',
  '--skipLibCheck',

  '--module',
  'NodeNext',

  '--moduleResolution',
  'NodeNext',

  '--target',
  'ESNext',
];
