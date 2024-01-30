/* eslint-disable @typescript-eslint/no-magic-numbers */
'use client';

import { type PropsWithChildren, type ReactElement, memo } from 'react';
import THEME from '../constants/theme.js';
import ThemeContext from '../contexts/theme.js';

// import darkVisualStudio from '../themes/dark-visual-studio.json';
// import flattenVSCodeColorTheme from '../utils/flatten-vscode-color-theme.js';
// const flatDarkVisualStudio = flattenVSCodeColorTheme(darkVisualStudio);
// const mapVSCodeColorThemeToTheme = theme => ({
//   backgroundColor: flatDarkVisualStudio['editor.background'],
//   displayFontWeight: 700,
//   foregroundColor: flatDarkVisualStudio['editor.foreground'],
//   primary: [200, 240, 160],
//   primaryDark: flatDarkVisualStudio['comment.foreground'],
//   primaryFontWeight: 700,
//   displayFontFamily: '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
// });

function Theme({ children }: PropsWithChildren): ReactElement {
  return (
    <ThemeContext.Provider value={THEME}>{children}</ThemeContext.Provider>
  );
}

export default memo(Theme);
