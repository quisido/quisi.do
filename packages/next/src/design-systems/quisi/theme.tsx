import {
  type PropsWithChildren,
  type ReactElement,
  useLayoutEffect,
} from 'react';
import useTheme from '../../hooks/use-theme.js';

const BORDER_COLOR_OPACITY = 0.15;

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundHex, foregroundHex, secondaryAlpha } = useTheme();

  useLayoutEffect((): VoidFunction => {
    const { style } = window.document.body;
    const previousColor: string | null = style.getPropertyValue('color');
    const previousBackgroundColor: string | null =
      style.getPropertyValue('background-color');
    style.setProperty('background-color', backgroundHex);
    style.setProperty('color', foregroundHex);
    return (): void => {
      style.setProperty('background-color', previousBackgroundColor);
      style.setProperty('color', previousColor);
    };
  }, [backgroundHex, foregroundHex]);

  return (
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
  );
}
