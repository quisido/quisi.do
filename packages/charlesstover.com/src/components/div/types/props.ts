import type { ReactNode } from 'react';

/*
Consider `BaseProps extends SpanProps` from `src/components/span` and nesting a
  `<Span />` element that receives the `SpanProps`.
*/

interface BaseProps {
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

type Props = BaseProps &
  (MarginProp | ((MarginXProp | MarginXProps) & (MarginYProp | MarginYProps)));

export default Props;
