export const ALLOWED_METHODS_ARR: readonly string[] = [
  'GET',
  'OPTIONS',
  'POST',
];

export const ALLOWED_METHODS_STR: string = ALLOWED_METHODS_ARR.join(', ');

export const ALLOWED_METHODS_SET: Set<string> = new Set<string>(
  ALLOWED_METHODS_ARR,
);
