import type { DefaultExport } from './default-export.js';

export type DynamicImportedTranslations = () => Promise<
  DefaultExport<Record<string, string>> | Record<string, string>
>;
