import {
  useLayoutEffect,
  useMemo,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import useTheme from '../../hooks/use-theme.js';
import map from '../../utils/map.js';
import validateString from '../../utils/validate-string.js';
import styles from './theme.module.scss';

const BORDER_COLOR_OPACITY = 0.5;
const CLASS_NAME: string = validateString(styles['theme']);
const MAX_COLOR = 255;

const INNER_BORDER_COLOR_CLASS_NAME: string = validateString(
  styles['border-inner'],
);

const OUTER_BORDER_COLOR_CLASS_NAME: string = validateString(
  styles['border-outer'],
);

const invert = (color: number): number => MAX_COLOR - color;

function useBackgroundImage(): string | undefined {
  const { background, lines } = useTheme();

  return useMemo((): string | undefined => {
    if (!lines) {
      return;
    }

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
  }, [background, lines]);
}

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundHex, foregroundHex, lines, secondaryAlpha } = useTheme();
  const backgroundImage: string | undefined = useBackgroundImage();

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

  const getBorderColor = (): string => {
    if (!lines) {
      return 'transparent';
    }

    return secondaryAlpha(BORDER_COLOR_OPACITY);
  };

  const borderColor: string = getBorderColor();
  return (
    <div className={OUTER_BORDER_COLOR_CLASS_NAME} style={{ borderColor }}>
      <div className={INNER_BORDER_COLOR_CLASS_NAME}>
        <div className={CLASS_NAME} style={{ backgroundImage, borderColor }}>
          {children}
        </div>
      </div>
    </div>
  );
}
