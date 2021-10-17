import useDarkMode from '../../hooks/use-dark-mode';
import useSetDarkMode from '../../hooks/use-set-dark-mode';

interface State {
  readonly checked: boolean;
  readonly handleChange: (checked: boolean) => void;
}

export default function useWrapperDarkModeToggle(): State {
  return {
    checked: useDarkMode(),
    handleChange: useSetDarkMode(),
  };
}
