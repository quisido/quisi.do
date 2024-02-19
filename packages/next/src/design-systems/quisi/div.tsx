import type { ReactElement } from 'react';
import type { Props } from '../../components/div/index.js';

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
        gap,
        justifyContent,
        textAlign,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
