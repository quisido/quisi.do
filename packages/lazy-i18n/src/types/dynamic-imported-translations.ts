import type { DefaultExport } from './default-export.js';

export default interface DynamicImportedTranslations {
  (): Promise<DefaultExport<Record<string, string>> | Record<string, string>>;
}
