import { useLayoutEffect } from 'react';
import useColorScheme from '../hooks/use-color-scheme.js';
import setColorScheme from '../utils/set-color-scheme.js';

export default function useHtmlColorSchemeEffect(): void {
  const [colorScheme] = useColorScheme();

  useLayoutEffect((): void => {
    setColorScheme(colorScheme);
  }, [colorScheme]);
}
