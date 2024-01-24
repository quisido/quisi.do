import useDarkMode from '../../../../hooks/use-dark-mode.js';

interface State {
  readonly checked: boolean;
  readonly handleChange: (checked: boolean) => void;
}

export default function useSettingsDarkModeToggle(): State {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useDarkMode();

  return {
    checked: isDarkModeEnabled,
    handleChange: setIsDarkModeEnabled,
  };
}
