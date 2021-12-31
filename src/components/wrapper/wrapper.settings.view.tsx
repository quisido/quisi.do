import SpaceBetween from '@awsui/components-react/space-between';
import type { ReactElement } from 'react';
import DarkModeToggle from './wrapper.dark-mode-toggle.view';
import DesignSystemSelect from './wrapper.design-system-select.view';
import LanguageSelect from './wrapper.language-select.view';

const isDesignSystemSelectable: boolean =
  process.env.NODE_ENV === 'development';

export default function Settings(): ReactElement {
  return (
    <SpaceBetween direction="vertical" size="m">
      <DarkModeToggle />
      {isDesignSystemSelectable && <DesignSystemSelect />}
      <LanguageSelect />
    </SpaceBetween>
  );
}
