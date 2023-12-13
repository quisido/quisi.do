import type { PropsWithChildren, ReactElement } from 'react';
import useTheme from '../../../hooks/use-theme';

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
  background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01));
  color: ${foregroundColor};
}
`,
        }}
      />
      {children}
    </>
  );
}
