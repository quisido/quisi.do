import {
  type PropsWithChildren,
  type ReactElement,
  useMemo,
  useState,
} from 'react';
import { THEME } from '../constants/theme.js';
import { CustomThemeProvider } from '../contexts/custom-theme.js';
import type CustomTheme from '../types/custom-theme.js';
import toggle from '../utils/toggle.js';

// import darkVisualStudio from '../themes/dark-visual-studio.json';
// import flattenVSCodeColorTheme from '../utils/flatten-vscode-color-theme.js';
// const flatDarkVisualStudio = flattenVSCodeColorTheme(darkVisualStudio);
// const mapVSCodeColorThemeToTheme = theme => ({
//   backgroundColor: flatDarkVisualStudio['editor.background'],
//   displayFontWeight: 700,
//   foregroundColor: flatDarkVisualStudio['editor.foreground'],
//   primary: [200, 240, 160],
//   primaryFontWeight: 700,
//   displayFontFamily: '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
// });

const IS_DEVELOPMENT: boolean =
  import.meta.env.DEPLOYMENT_ENVIRONMENT === 'local';

export default function CustomThemeProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  const [lines, setLines] = useState<boolean>(IS_DEVELOPMENT);

  const value = useMemo(
    (): CustomTheme => ({
      ...THEME,
      dev: IS_DEVELOPMENT,
      lines,
      toggleLines(): void {
        setLines(toggle);
      },
    }),
    [lines],
  );

  return <CustomThemeProvider value={value}>{children}</CustomThemeProvider>;
}
