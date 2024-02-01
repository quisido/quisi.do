import type { PropsWithChildren, ReactElement } from 'react';
import useTheme from '../../hooks/use-theme.js';

const BORDER_COLOR_OPACITY = 0.15;

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundColor, foregroundHex, secondaryAlpha } = useTheme();

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
body {
  background-color: ${backgroundColor};
  color: ${foregroundHex};
}
`,
        }}
      />

      <div
        style={{
          borderColor: secondaryAlpha(BORDER_COLOR_OPACITY),
          borderStyle: 'double',
          borderWidth: '0 6px',
          boxSizing: 'border-box',
          margin: '0 auto',
          maxWidth: '60em',
          minWidth: 320,
          paddingBottom: 0,
          paddingLeft: '1em',
          paddingRight: '1em',
          paddingTop: '0.5in',
        }}
      >
        {children}
      </div>
    </>
  );
}
