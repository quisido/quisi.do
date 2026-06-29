import type { DefaultExport } from './default-export.js';

export type RequiredTranslations = () =>
  | DefaultExport<Record<string, string>>
  | Record<string, string>;
