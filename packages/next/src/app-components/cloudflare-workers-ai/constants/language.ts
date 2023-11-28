import createEnumUtils from '../../../utils/create-enum-utils';

enum Language {
  English = 'en',
  French = 'fr',
  Japanese = 'ja',
}
export default Language;

const { isType } = createEnumUtils(Language, 'a language');
export const isLanguage = isType;
