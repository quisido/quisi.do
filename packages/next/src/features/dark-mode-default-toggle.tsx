'use client';

import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useDarkMode from '../hooks/use-dark-mode.js';
import validateString from '../utils/validate-string.js';
import styles from './dark-mode-default-toggle.module.scss';

const DARK_CLASS_NAME: string = validateString(styles['dark']);
const LIGHT_CLASS_NAME: string = validateString(styles['light']);

export default function DarkModeDefaultToggle(): ReactElement {
  const [, setDarkMode] = useDarkMode();

  return (
    <>
      <button
        className={DARK_CLASS_NAME}
        onClick={(): void => {
          setDarkMode(false);
        }}
      >
        <Emoji>🌘</Emoji>
      </button>
      <button
        className={LIGHT_CLASS_NAME}
        onClick={(): void => {
          setDarkMode(true);
        }}
      >
        <Emoji>🌖</Emoji>
      </button>
    </>
  );
}
