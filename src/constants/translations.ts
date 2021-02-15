import { Translations } from 'lazy-i18n';
import Language from '../constants/language';
import english from '../translations/english.json';

const TRANSLATIONS: Record<Language, Translations> = {
  [Language.Arabic]: () => import('../translations/arabic.json'),
  [Language.Cebuano]: () => import('../translations/cebuano.json'),
  [Language.English]: english,
  [Language.Japanese]: () => import('../translations/japanese.json'),
};

export default TRANSLATIONS;
