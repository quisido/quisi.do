import createEnumUtils from '../../../utils/create-enum-utils';

enum Language {
  English = 'en',
  French = 'fr',
  Japanese = 'ja',
}
export default Language;

const { isType } = createEnumUtils('Language', Language);
export const isLanguage = isType;
