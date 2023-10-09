import { type ReactElement } from 'react';
import Div from '../div';
import DarkModeToggle from './components/dark-mode-toggle';
import DesignSystemSelect from './components/design-system-select';
import LanguageSelect from './components/language-select';

export default function Settings(): ReactElement {
  return (
    <Div display="flex" flexDirection="column" gap="medium">
      <DarkModeToggle />
      <DesignSystemSelect />
      <LanguageSelect />
    </Div>
  );
}
