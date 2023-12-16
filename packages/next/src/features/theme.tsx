/* eslint-disable @typescript-eslint/no-magic-numbers */
'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import ThemeContext from '../contexts/theme';

// import darkVisualStudio from '../themes/dark-visual-studio.json';
// import flattenVSCodeColorTheme from '../utils/flatten-vscode-color-theme';
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
        backgroundColor: '#ffffff',
        displayFontWeight: 700,
        foregroundColor: '#000000',
        primary: [240, 160, 200], // #f0a0c8
        primaryDark: '#604050',
        primaryFontWeight: 700,
        // secondary: [34, 174, 221],
        // secondaryDark: '#0a3442',
        displayFontFamily:
          '"Noto Sans Display", "Noto Sans", Helvetica, sans-serif',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
