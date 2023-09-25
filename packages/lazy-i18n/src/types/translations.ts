import type { DefaultExport } from '../types/default-export.js';
import type DynamicImportedTranslations from './dynamic-imported-translations.js';
import type { RequiredTranslations } from './required-translations.js';

export type Translations =
  | DefaultExport<Record<string, string>>
  | DynamicImportedTranslations
  | Record<string, string>
  | RequiredTranslations;
