import type { PropsWithChildren, ReactElement } from 'react';
import useTheme from '../../../hooks/use-theme.js';

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundColor, foregroundColor } = useTheme();

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
body {
  background-color: ${backgroundColor};
  color: ${foregroundColor};
}
`,
        }}
      />
      {children}
    </>
  );
}
