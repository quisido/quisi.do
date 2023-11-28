import type { ReactElement } from 'react';
import type { Props } from '../../components/div.js';

const NONE = 0;

const mapSizeToCss = (
  size: 'small' | 'medium' | 'large' | undefined,
): number | string => {
  if (typeof size === 'undefined') {
    return NONE;
  }
  switch (size) {
    case 'large':
      return '2rem';
    case 'medium':
      return '1rem';
    case 'small':
      return '0.5rem';
  }
};

export default function Div({
  alignItems,
  children,
  className,
  display,
  element,
  flexDirection,
  flexWrap,
  float,
  gap,
  justifyContent,
  marginBottom,
  marginTop,
  textAlign,
}: Props): ReactElement {
  const Component: 'div' | 'h2' | 'h3' | 'h4' | 'p' = element ?? 'div';
  return (
    <Component
      style={{
        alignItems,
        display,
        flexDirection,
        flexWrap,
        float,
        fontSize: '1em',
        gap,
        justifyContent,
        lineHeight: '1rem',
        marginBottom: mapSizeToCss(marginBottom),
        marginTop: mapSizeToCss(marginTop),
        padding: 0,
        textAlign,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
