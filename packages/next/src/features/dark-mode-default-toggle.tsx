'use client';

import { useTranslate, type TranslateFunction } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useDarkMode from '../hooks/use-dark-mode.js';
import validateString from '../utils/validate-string.js';
import styles from './dark-mode-default-toggle.module.scss';
import DarkModeToggleButton from './dark-mode-toggle-button.jsx';

const DARK_CLASS_NAME: string = validateString(styles['dark']);
const LIGHT_CLASS_NAME: string = validateString(styles['light']);

export default function DarkModeDefaultToggle(): ReactElement {
  const [, setDarkMode] = useDarkMode();
  const translate: TranslateFunction = useTranslate();

  return (
    <>
      <DarkModeToggleButton
        className={DARK_CLASS_NAME}
        label={translate('Use light color scheme') ?? 'Use light color scheme'}
        onClick={(): void => {
          setDarkMode(false);
        }}
      >
        <Emoji>🌘</Emoji>
      </DarkModeToggleButton>
      <DarkModeToggleButton
        className={LIGHT_CLASS_NAME}
        label={translate('Use dark color scheme') ?? 'Use dark color scheme'}
        onClick={(): void => {
          setDarkMode(true);
        }}
      >
        <Emoji>🌖</Emoji>
      </DarkModeToggleButton>
    </>
  );
}
