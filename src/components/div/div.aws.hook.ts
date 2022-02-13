import type { BoxProps } from '@awsui/components-react/box';
import { useMemo } from 'react';
import validateString from '../../utils/validate-string';
import mapSizeToSpacingSize from './utils/map-size-to-spacing-size';
import styles from './div.aws.module.scss';
import filterByDefined from '../../utils/filter-by-defined';
import filterByUndefined from '../../utils/filter-by-undefined';

interface Props {
  readonly className: string | undefined;
  readonly display: 'block' | 'flex' | undefined;
  readonly element: 'h2' | 'p' | undefined;
  readonly margin: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
  readonly marginX: 'large' | 'medium' | 'small' | undefined;
  readonly marginY: 'large' | 'medium' | 'small' | undefined;
  readonly flexDirection:
    | 'column-reverse'
    | 'column'
    | 'row-reverse'
    | 'row'
    | undefined;
}

interface State {
  readonly className: string | undefined;
  readonly display: BoxProps.Display | undefined;
  readonly margin: BoxProps.Spacing | undefined;
  readonly variant: 'h2' | 'p' | undefined;
}

const EMPTY = 0;

const displayFlexClassName: string = validateString(styles.displayFlex);
const flexDirectionColumnClassName: string = validateString(
  styles.flexDirectionColumn,
);
const flexDirectionColumnReverseClassName: string = validateString(
  styles.flexDirectionColumnReverse,
);
const flexDirectionRowClassName: string = validateString(
  styles.flexDirectionRow,
);
const flexDirectionRowReverseClassName: string = validateString(
  styles.flexDirectionRowReverse,
);

export default function useAwsDiv({
  className,
  display,
  element,
  flexDirection,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): State {
  const marginBottomSize: 'large' | 'medium' | 'small' | undefined =
    marginBottom ?? marginY ?? margin;
  const marginLeftSize: 'large' | 'medium' | 'small' | undefined =
    marginLeft ?? marginX ?? margin;
  const marginRightSize: 'large' | 'medium' | 'small' | undefined =
    marginRight ?? marginX ?? margin;
  const marginTopSize: 'large' | 'medium' | 'small' | undefined =
    marginTop ?? marginY ?? margin;

  return {
    variant: element,

    className: useMemo((): string | undefined => {
      const classNames: string[] = [];

      if (typeof className === 'string') {
        classNames.push(className);
      }

      if (display === 'flex') {
        classNames.push(displayFlexClassName);
      }

      switch (flexDirection) {
        case 'column':
          classNames.push(flexDirectionColumnClassName);
          break;
        case 'column-reverse':
          classNames.push(flexDirectionColumnReverseClassName);
          break;
        case 'row':
          classNames.push(flexDirectionRowClassName);
          break;
        case 'row-reverse':
          classNames.push(flexDirectionRowReverseClassName);
          break;
        case undefined:
          break;
      }

      if (classNames.length === EMPTY) {
        return;
      }

      return classNames.join(' ');
    }, [className, display, flexDirection]),

    display: useMemo((): BoxProps.Display | undefined => {
      switch (display) {
        case 'block':
          return 'block';
        default:
          return;
      }
    }, [display]),

    margin: useMemo((): BoxProps.Spacing | undefined => {
      if (
        filterByUndefined(marginBottomSize) &&
        filterByUndefined(marginLeftSize) &&
        filterByUndefined(marginRightSize) &&
        filterByUndefined(marginTopSize)
      ) {
        return;
      }

      const newMargin: BoxProps.Spacing = {};
      if (filterByDefined(marginBottomSize)) {
        newMargin.bottom = mapSizeToSpacingSize(marginBottomSize);
      }
      if (filterByDefined(marginLeftSize)) {
        newMargin.left = mapSizeToSpacingSize(marginLeftSize);
      }
      if (filterByDefined(marginRightSize)) {
        newMargin.right = mapSizeToSpacingSize(marginRightSize);
      }
      if (filterByDefined(marginTopSize)) {
        newMargin.top = mapSizeToSpacingSize(marginTopSize);
      }

      return newMargin;
    }, [marginBottomSize, marginLeftSize, marginRightSize, marginTopSize]),
  };
}
