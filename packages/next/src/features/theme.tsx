/* eslint-disable @typescript-eslint/no-magic-numbers */
'use client';

import type { PropsWithChildren, ReactElement } from 'react';
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

export default function Theme({ children }: PropsWithChildren): ReactElement {
  return (
    <ThemeContext.Provider
      value={{
        backgroundColor: '#fffcf0',
        displayFontWeight: 700,
        foreground: [0x00, 0x00, 0x00],
        primary: [0xf0, 0xa0, 0xc8], // [240, 160, 200]
        primaryDark: '#604050',
        primaryFontWeight: 700,
        secondary: [0xc0, 0xe0, 0xa0],
        // secondaryDark: '#0a3442',
        displayFontFamily:
          '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
