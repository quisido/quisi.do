import DefaultExport from '../types/default-export';

export default interface DynamicImportedTranslations {
  (): Promise<DefaultExport<Record<string, string>> | Record<string, string>>;
}
