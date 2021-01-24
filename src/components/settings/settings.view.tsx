import SpaceBetween from '@awsui/components-react/space-between';
import { ReactElement } from 'react';
import DarkModeToggle from '../../components/dark-mode-toggle';
import LanguageSelect from '../../components/language-select';

export default function Settings(): ReactElement {
  return (
    <SpaceBetween direction="vertical" size="m">
      <DarkModeToggle />
      <LanguageSelect />
    </SpaceBetween>
  );
}
