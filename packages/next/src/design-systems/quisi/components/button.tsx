/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useButton } from '@react-aria/button';
import { type ReactElement, useRef } from 'react';
import { type Props } from '../../../components/button';
import useElementId from '../../../hooks/use-element-id';
import useTheme from '../../../hooks/use-theme';
import useEmit from '../../../hooks/use-emit';

const OUTLINE_WIDTH = 4;
const HOVER_OFFSET = -2;
const RAISED_OFFSET = -3;

export default function Button({
  children,
  feature,
  href,
  onClick,
}: Props): ReactElement {
  // Contexts
  const emit = useEmit();
  const { backgroundColor, primaryDark, primaryFontWeight, primaryHex } =
    useTheme();

  // States
  const id: string = useElementId();
  const { buttonProps } = useButton(
    {
      href,
      onPress: (): void => {
        if (typeof onClick === 'function') {
          onClick();
        }

        emit('button.click', {
          designSystem: 'quisi',
          feature,
        });
      },
    },
    useRef(null),
  );

  return (
    <>
      <style type="text/css">{`
#${id}:active,
#${id}:active:hover {
  box-shadow: ${primaryDark}C0 ${OUTLINE_WIDTH}px ${OUTLINE_WIDTH}px 4px !important;
  margin-bottom: ${OUTLINE_WIDTH}px !important;
  margin-left: ${OUTLINE_WIDTH}px !important;
  margin-right: ${OUTLINE_WIDTH}px !important;
  margin-top: ${OUTLINE_WIDTH}px !important;
}

#${id}:hover {
  box-shadow: ${primaryDark}A0 ${OUTLINE_WIDTH - HOVER_OFFSET}px ${
    OUTLINE_WIDTH - HOVER_OFFSET
  }px 4px !important;
  margin-bottom: ${OUTLINE_WIDTH - HOVER_OFFSET}px !important;
  margin-left: ${OUTLINE_WIDTH + HOVER_OFFSET}px !important;
  margin-right: ${OUTLINE_WIDTH - HOVER_OFFSET}px !important;
  margin-top: ${OUTLINE_WIDTH + HOVER_OFFSET}px !important;
}

#${id}:not(:focus-visible) {
  outline-color: ${primaryHex};
  outline-style: solid;
  outline-width: ${OUTLINE_WIDTH}px;
}
`}</style>
      <button
        {...buttonProps}
        id={id}
        style={{
          backgroundColor: primaryHex,
          borderColor: backgroundColor,
          borderRadius: 1,
          borderImageSlice: '16',
          borderImageSource: `repeating-linear-gradient(45deg, ${backgroundColor}, ${backgroundColor} 2px, ${primaryHex} 1px, ${primaryHex} 16px)`,
          borderImageRepeat: 'round',
          borderImageWidth: 2,
          borderStyle: 'dashed',
          borderWidth: 2,
          color: primaryDark,
          cursor: 'pointer',
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: 16,
          fontWeight: primaryFontWeight,
          marginBottom: OUTLINE_WIDTH - RAISED_OFFSET,
          marginLeft: OUTLINE_WIDTH + RAISED_OFFSET,
          marginRight: OUTLINE_WIDTH - RAISED_OFFSET,
          marginTop: OUTLINE_WIDTH + RAISED_OFFSET,
          paddingBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          transform: 'rotate(-1deg)',
          transitionDelay: '0s',
          transitionDuration: '150ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none',
          boxShadow: `${primaryDark}80 ${OUTLINE_WIDTH - RAISED_OFFSET}px ${
            OUTLINE_WIDTH - RAISED_OFFSET
          }px 4px`,
          transitionProperty: [
            'box-shadow',
            'margin-bottom',
            'margin-left',
            'margin-right',
            'margin-top',
          ].join(', '),
        }}
      >
        {children}
      </button>
    </>
  );
}
