import { Translations } from 'lazy-i18n';
import Language from '../constants/language';
import english from '../translations/english.json';

const TRANSLATIONS: Record<Language, Translations> = {
  [Language.Cebuano]: () => import('../translations/cebuano.json'),
  [Language.English]: english,
};

export default TRANSLATIONS;
