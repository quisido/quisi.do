import {
  type PropsWithChildren,
  type ReactElement,
  useLayoutEffect,
  useMemo,
} from 'react';
import useTheme from '../../hooks/use-theme.js';
import map from '../../utils/map.js';

const BORDER_BOX_MIN_WIDTH = 320;
const BORDER_COLOR_OPACITY = 0.15;
const BORDER_X_COUNT = 2;
const BORDER_WIDTH = 6;
const MAX_COLOR = 255;

const CONTENT_BOX_MIN_WIDTH =
  BORDER_BOX_MIN_WIDTH - BORDER_WIDTH * BORDER_X_COUNT;

const invert = (color: number): number => MAX_COLOR - color;

function useBackgroundImage(): string {
  const { background } = useTheme();

  return useMemo((): string => {
    const invertedRgb: readonly [number, number, number] = map(
      background,
      invert,
    );

    const gradient: string = [
      'transparent',
      `rgba(${invertedRgb.join(', ')}, 0.25) 1px`,
      'transparent 1px',
      'transparent 1rem',
    ].join(', ');

    return `repeating-linear-gradient(${gradient})`;
  }, [background]);
}

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundHex, foregroundHex, secondaryAlpha } = useTheme();
  const backgroundImage: string = useBackgroundImage();

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
        backgroundImage,
        borderBottomWidth: 0,
        borderColor: backgroundHex,
        borderLeftWidth: BORDER_WIDTH,
        borderRightWidth: BORDER_WIDTH,
        borderStyle: 'solid',
        borderTopWidth: 0,
        boxSizing: 'content-box',
        margin: '0 auto',
        maxWidth: '60em',
        minWidth: CONTENT_BOX_MIN_WIDTH,
        outlineColor: secondaryAlpha(BORDER_COLOR_OPACITY),
        outlineOffset: -BORDER_WIDTH,
        outlineStyle: 'double',
        outlineWidth: `0 ${BORDER_WIDTH}px`,
        paddingBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
}
