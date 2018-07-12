import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import Locale from '../../../../constants/locale.js';
import { useLocale } from '../../../../contexts/locale.js';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import isLocale from '../../../../utils/is-locale.js';

interface State {
  readonly label: string | undefined;
  readonly locale: Locale;
  readonly handleChange: (newLanguage: string | undefined) => void;
}

export default function useSettingsLanguageSelect(): State {
  const [locale, setLocale] = useLocale();
  const translate: TranslateFunction = useTranslate();

  return {
    label: translate('Language'),
    locale,

    handleChange: useEffectEvent((newLocale: string | undefined): void => {
      if (typeof newLocale === 'undefined') {
        setLocale(Locale.English);
        return;
      }

      if (!isLocale(newLocale)) {
        throw new Error(`Expected a locale, but received: ${newLocale}`);
      }

      setLocale(newLocale);
    }),
  };
}
