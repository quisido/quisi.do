import type { CSSProperties, ReactElement } from 'react';
import { useMemo } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';
import mapSizeToMuiFontSize from './utils/map-size-to-mui-font-size';

export default function React95Span({
  children,
  className,
  // color,
  element,
  size,
}: Readonly<Props>): ReactElement {
  const style: CSSProperties = useMemo((): CSSProperties => {
    const newStyle: CSSProperties = {};
    if (filterByDefined(size)) {
      newStyle.fontSize = mapSizeToMuiFontSize(size);
    }
    return newStyle;
  }, [size]);

  const Element: 'h2' | 'p' | 'span' = element ?? 'span';

  return (
    <Element className={className} style={style}>
      {children}
    </Element>
  );
}
