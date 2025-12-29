import { type ReactElement, type ReactNode } from 'react';

interface BaseProps {
  readonly alignItems?: 'center' | undefined;
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly display?: 'block' | 'flex' | undefined;
  readonly element?: 'h2' | 'h3' | 'h4' | 'p' | undefined;
  readonly flexDirection?:
    | 'column-reverse'
    | 'column'
    | 'row-reverse'
    | 'row'
    | undefined;
  readonly flexWrap?: 'nowrap' | 'wrap' | undefined;
  readonly float?: 'left' | 'right' | undefined;
  readonly gap?: 'large' | 'medium' | 'small' | undefined;
  readonly justifyContent?: 'space-around' | 'space-between' | undefined;
  readonly textAlign?: 'center' | 'left' | 'right' | undefined;
}

interface MarginProp {
  readonly margin?: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom?: undefined;
  readonly marginLeft?: undefined;
  readonly marginRight?: undefined;
  readonly marginTop?: undefined;
  readonly marginX?: undefined;
  readonly marginY?: undefined;
}

interface MarginXProp {
  readonly margin?: undefined;
  readonly marginLeft?: undefined;
  readonly marginRight?: undefined;
  readonly marginX?: 'large' | 'medium' | 'small' | undefined;
}

interface MarginXProps {
  readonly margin?: undefined;
  readonly marginLeft?: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight?: 'large' | 'medium' | 'small' | undefined;
  readonly marginX?: undefined;
}

interface MarginYProp {
  readonly margin?: undefined;
  readonly marginBottom?: undefined;
  readonly marginTop?: undefined;
  readonly marginY?: 'large' | 'medium' | 'small' | undefined;
}

interface MarginYProps {
  readonly margin?: undefined;
  readonly marginBottom?: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
  readonly marginY?: undefined;
}

export type Props = BaseProps &
  (MarginProp | ((MarginXProp | MarginXProps) & (MarginYProp | MarginYProps)));

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
