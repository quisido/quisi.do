import { Translations } from 'lazy-i18n';
import english from '../translations/english.json';

const TRANSLATIONS: Record<string, Translations> = {
  cebuano: () => import('../translations/cebuano.json'),
  english,
};

export default TRANSLATIONS;
