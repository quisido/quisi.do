import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import { useCustomTheme } from '../contexts/custom-theme.js';
import validateString from '../utils/validate-string.js';
import styles from './notebook-toggle.module.scss';

const CLASS_NAME: string = validateString(styles['toggle']);

export default function NotebookToggle(): ReactElement | null {
  const { dev, lines, toggleLines } = useCustomTheme();
  const translate: TranslateFunction = useTranslate();

  // Only developers should see the notebook toggle.
  if (!dev) {
    return null;
  }

  // If lines are enabled, show a striped horse.
  if (lines) {
    const label: string = translate('Remove lines') ?? 'Remove lines';
    return (
      <button
        aria-label={label}
        className={CLASS_NAME}
        onClick={toggleLines}
        title={label}
        type="button"
      >
        <Emoji>🦓</Emoji>
      </button>
    );
  }

  // If lines are disabled, show an unstriped zebra.
  const label: string = translate('Add lines') ?? 'Add lines';
  return (
    <button
      aria-label={label}
      className={CLASS_NAME}
      onClick={toggleLines}
      title={label}
      type="button"
    >
      <Emoji>🐎</Emoji>
    </button>
  );
}
