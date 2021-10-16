import SpaceBetween from '@awsui/components-react/space-between';
import type { ReactElement } from 'react';
import DarkModeToggle from './navigation.dark-mode-toggle.view';
import DesignSystemSelect from './navigation.design-system-select.view';
import LanguageSelect from './navigation.language-select.view';

export default function Settings(): ReactElement {
  return (
    <SpaceBetween direction="vertical" size="m">
      <DarkModeToggle />
      <DesignSystemSelect />
      <LanguageSelect />
    </SpaceBetween>
  );
}
