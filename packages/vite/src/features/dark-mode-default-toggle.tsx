import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { type ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useColorScheme from '../hooks/use-color-scheme.js';
import validateString from '../utils/validate-string.js';
import styles from './dark-mode-default-toggle.module.scss';
import DarkModeToggleButton from './dark-mode-toggle-button.jsx';

const DARK_CLASS_NAME: string = validateString(styles['dark']);
const LIGHT_CLASS_NAME: string = validateString(styles['light']);

export default function DarkModeDefaultToggle(): ReactElement {
  const [, setColorScheme] = useColorScheme();
  const translate: TranslateFunction = useTranslate();

  return (
    <>
      <DarkModeToggleButton
        className={DARK_CLASS_NAME}
        label={translate('Use light color scheme') ?? 'Use light color scheme'}
        onClick={(): void => {
          setColorScheme('light');
        }}
      >
        <Emoji>🌘</Emoji>
      </DarkModeToggleButton>
      <DarkModeToggleButton
        className={LIGHT_CLASS_NAME}
        label={translate('Use dark color scheme') ?? 'Use dark color scheme'}
        onClick={(): void => {
          setColorScheme('dark');
        }}
      >
        <Emoji>🌖</Emoji>
      </DarkModeToggleButton>
    </>
  );
}
