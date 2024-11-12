export const ALLOWED_METHODS_ARR = ['GET', 'OPTIONS', 'POST'] as const;

export type AllowedMethod = (typeof ALLOWED_METHODS_ARR)[number];

export const ALLOWED_METHODS_STR: string = ALLOWED_METHODS_ARR.join(', ');
