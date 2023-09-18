import DefaultExport from '../types/default-export';

type RequiredTranslations = () =>
  | DefaultExport<Record<string, string>>
  | Record<string, string>;
export default RequiredTranslations;
