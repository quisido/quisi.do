import type { CSSProperties, ReactElement } from 'react';
import { useMemo } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';
import mapSizeToSystemValue from './utils/map-size-to-system-value';

const REM = 16;

export default function React95Div({
  children,
  className,
  display,
  element,
  flexDirection,
  float,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Readonly<Props>): ReactElement {
  const style: CSSProperties = useMemo((): CSSProperties => {
    const marginBottomValue: number | undefined = mapSizeToSystemValue(
      marginBottom ?? marginY ?? margin,
    );
    const marginLeftValue: number | undefined = mapSizeToSystemValue(
      marginLeft ?? marginX ?? margin,
    );
    const marginRightValue: number | undefined = mapSizeToSystemValue(
      marginRight ?? marginX ?? margin,
    );
    const marginTopValue: number | undefined = mapSizeToSystemValue(
      marginTop ?? marginY ?? margin,
    );
    const newStyles: CSSProperties = {};
    if (filterByDefined(display)) {
      newStyles.display = display;
    }
    if (filterByDefined(flexDirection)) {
      newStyles.flexDirection = flexDirection;
    }
    if (filterByDefined(float)) {
      newStyles.float = float;
    }
    if (filterByDefined(marginBottomValue)) {
      newStyles.marginBottom = marginBottomValue * REM;
    }
    if (filterByDefined(marginLeftValue)) {
      newStyles.marginLeft = marginLeftValue * REM;
    }
    if (filterByDefined(marginRightValue)) {
      newStyles.marginRight = marginRightValue * REM;
    }
    if (filterByDefined(marginTopValue)) {
      newStyles.marginTop = marginTopValue * REM;
    }
    if (filterByDefined(textAlign)) {
      newStyles.textAlign = textAlign;
    }
    return newStyles;
  }, [
    display,
    flexDirection,
    float,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    textAlign,
  ]);

  const Element: 'div' | 'h2' | 'p' = element ?? 'div';
  return (
    <Element className={className} style={style}>
      {children}
    </Element>
  );
}
