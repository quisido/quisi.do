import { type ReactElement } from 'react';
import Div from '../div/index.js';
import DarkModeToggle from './components/dark-mode-toggle/index.js';
import DesignSystemSelect from './components/design-system-select/index.js';
import LanguageSelect from './components/language-select/index.js';

export default function Settings(): ReactElement {
  return (
    <Div display="flex" flexDirection="column" gap="medium">
      <DarkModeToggle />
      <DesignSystemSelect />
      <LanguageSelect />
    </Div>
  );
}
