import DefaultExport from '../types/default-export';
import DynamicImportedTranslations from '../types/dynamic-imported-translations';
import RequiredTranslations from '../types/required-translations';

type Translations =
  | DefaultExport<Record<string, string>>
  | DynamicImportedTranslations
  | Record<string, string>
  | RequiredTranslations;
export default Translations;
