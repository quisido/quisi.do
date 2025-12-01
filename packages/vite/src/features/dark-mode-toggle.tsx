import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useColorScheme from '../hooks/use-color-scheme.js';
import DarkModeDefaultToggle from './dark-mode-default-toggle.jsx';
import DarkModeToggleButton from './dark-mode-toggle-button.jsx';

export default function DarkModeToggle(): ReactElement {
  const [colorScheme, setColorScheme] = useColorScheme();
  const translate: TranslateFunction = useTranslate();

  if (colorScheme === null) {
    return <DarkModeDefaultToggle />;
  }

  if (colorScheme === 'dark') {
    return (
      <DarkModeToggleButton
        label={translate('Use light color scheme') ?? 'Use light color scheme'}
        onClick={(): void => {
          setColorScheme('light');
        }}
      >
        <Emoji>🌘</Emoji>
      </DarkModeToggleButton>
    );
  }

  return (
    <DarkModeToggleButton
      label={translate('Use dark color scheme') ?? 'Use dark color scheme'}
      onClick={(): void => {
        setColorScheme('dark');
      }}
    >
      <Emoji>🌖</Emoji>
    </DarkModeToggleButton>
  );
}
