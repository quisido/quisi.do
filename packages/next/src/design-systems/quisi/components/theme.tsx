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
  background-image: linear-gradient(rgba(0, 0, 0, 0.005), rgba(0, 0, 0, 0.005));
  color: ${foregroundColor};
}
`,
        }}
      />
      {children}
    </>
  );
}
