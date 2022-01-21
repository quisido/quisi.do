import type { ReactNode } from 'react';

/*
Consider `BaseProps extends SpanProps` from `src/components/span` and nesting a
  `<Span />` element that receives the `SpanProps`.
*/

interface BaseProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly element?: 'h2' | 'p' | undefined;
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

// eslint-disable-next-line @typescript-eslint/no-type-alias
type Props = BaseProps &
  // eslint-disable-next-line @typescript-eslint/no-type-alias
  (MarginProp | ((MarginXProp | MarginXProps) & (MarginYProp | MarginYProps)));

export default Props;
