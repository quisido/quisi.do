import { useLayoutEffect } from 'react';

import setColorScheme from '../utils/set-color-scheme.js';
import useColorScheme from './use-color-scheme.js';

export default function useHtmlColorSchemeEffect(): void {
  const [colorScheme] = useColorScheme();

  useLayoutEffect((): void => {
    setColorScheme(colorScheme);
  }, [colorScheme]);
}
