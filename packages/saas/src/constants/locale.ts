import createEnumUtils from '../utils/create-enum-utils.js';

enum Locale {
  Arabic = 'ar-EG',
  English = 'en-US',
  Spanish = 'es-ES',
  Filipino = 'fil-PH',
  Japanese = 'ja-JP',
}

export default Locale;

const { isType, validateType } = createEnumUtils(Locale, 'a locale');

export const isLocale: (value: unknown) => value is Locale = isType;

export const validateLocale: (value: unknown) => Locale = validateType;
