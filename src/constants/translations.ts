import type { Translations } from 'lazy-i18n';
import Language from '../constants/language';
import english from '../translations/english.json';

const TRANSLATIONS: Record<Language, Translations> = {
  [Language.Arabic]: async () => import('../translations/arabic.json'),
  [Language.Cebuano]: async () => import('../translations/cebuano.json'),
  [Language.English]: english,
  [Language.Japanese]: async () => import('../translations/japanese.json'),
};

export default TRANSLATIONS;
