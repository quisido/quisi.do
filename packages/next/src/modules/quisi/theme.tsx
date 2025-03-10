'use client';

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

const DEPLOYMENT_ENVIRONMENT: string = validateString(
  process.env['DEPLOYMENT_ENVIRONMENT'],
);

const INNER_BORDER_COLOR_CLASS_NAME: string = validateString(
  styles['border-inner'],
);

const OUTER_BORDER_COLOR_CLASS_NAME: string = validateString(
  styles['border-outer'],
);

const invert = (color: number): number => MAX_COLOR - color;

const isLocal: boolean = DEPLOYMENT_ENVIRONMENT === 'local';

function useBackgroundImage(): string | undefined {
  const { background } = useTheme();

  return useMemo((): string | undefined => {
    if (!isLocal) {
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
  }, [background]);
}

export default function Theme({ children }: PropsWithChildren): ReactElement {
  const { backgroundHex, foregroundHex, secondaryAlpha } = useTheme();
  const backgroundImage: string | undefined = useBackgroundImage();

  const getBorderColor = (): string => {
    if (!isLocal) {
      return 'transparent';
    }

    return secondaryAlpha(BORDER_COLOR_OPACITY);
  };

  const borderColor: string = getBorderColor();

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
      className={OUTER_BORDER_COLOR_CLASS_NAME}
      style={{
        borderColor,
      }}
    >
      <div
        className={INNER_BORDER_COLOR_CLASS_NAME}
        style={{
          borderColor: backgroundHex,
        }}
      >
        <div
          className={CLASS_NAME}
          style={{
            backgroundImage,
            borderColor,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
