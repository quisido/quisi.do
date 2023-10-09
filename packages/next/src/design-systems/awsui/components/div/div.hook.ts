import { type BoxProps } from '@awsui/components-react/box';
import { type CSSProperties, useMemo } from 'react';
import validateString from '../../../../utils/validate-string';
import styles from './div.module.scss';
import mapSizeToSpacingSize from './utils/map-size-to-spacing-size';
import mapSizeToPixels from './utils/map-size-to-pixels';

interface Props {
  readonly alignItems?: 'center' | undefined;
  readonly className?: string | undefined;
  readonly display?: 'block' | 'flex' | undefined;
  readonly element?: 'h2' | 'h3' | 'h4' | 'p' | undefined;
  readonly flexWrap?: 'nowrap' | 'wrap' | undefined;
  readonly gap?: 'large' | 'medium' | 'small' | undefined;
  readonly justifyContent?: 'space-around' | 'space-between' | undefined;
  readonly margin?: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom?: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft?: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight?: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
  readonly marginX?: 'large' | 'medium' | 'small' | undefined;
  readonly marginY?: 'large' | 'medium' | 'small' | undefined;
  readonly flexDirection?:
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
  readonly style: CSSProperties | undefined;
  readonly variant: 'h2' | 'h3' | 'h4' | 'p' | undefined;
}

const displayFlexClassName: string = validateString(styles.displayFlex);
const EMPTY = 0;
const flexWrapNowrapClassName: string = validateString(styles.flexWrapNowrap);
const flexWrapWrapClassName: string = validateString(styles.flexWrapWrap);

const alignItemsCenterClassName: string = validateString(
  styles.alignItemsCenter,
);

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

const justifyContentSpaceAroundClassName: string = validateString(
  styles.justifyContentSpaceAround,
);

const justifyContentSpaceBetweenClassName: string = validateString(
  styles.justifyContentSpaceBetween,
);

export default function useAwsuiDiv({
  alignItems,
  className,
  display,
  element,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Props): State {
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

      switch (alignItems) {
        case 'center':
          classNames.push(alignItemsCenterClassName);
          break;
        case undefined:
          break;
      }

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

      switch (flexWrap) {
        case 'nowrap':
          classNames.push(flexWrapNowrapClassName);
          break;
        case 'wrap':
          classNames.push(flexWrapWrapClassName);
          break;
        case undefined:
          break;
      }

      switch (justifyContent) {
        case 'space-around':
          classNames.push(justifyContentSpaceAroundClassName);
          break;
        case 'space-between':
          classNames.push(justifyContentSpaceBetweenClassName);
          break;
        case undefined:
          break;
      }

      if (classNames.length === EMPTY) {
        return;
      }

      return classNames.join(' ');
    }, [
      alignItems,
      className,
      display,
      flexDirection,
      flexWrap,
      justifyContent,
    ]),

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
        typeof marginBottomSize === 'undefined' &&
        typeof marginLeftSize === 'undefined' &&
        typeof marginRightSize === 'undefined' &&
        typeof marginTopSize === 'undefined'
      ) {
        return;
      }

      const newMargin: BoxProps.Spacing = {};
      if (typeof marginBottomSize !== 'undefined') {
        newMargin.bottom = mapSizeToSpacingSize(marginBottomSize);
      }

      if (typeof marginLeftSize !== 'undefined') {
        newMargin.left = mapSizeToSpacingSize(marginLeftSize);
      }

      if (typeof marginRightSize !== 'undefined') {
        newMargin.right = mapSizeToSpacingSize(marginRightSize);
      }

      if (typeof marginTopSize !== 'undefined') {
        newMargin.top = mapSizeToSpacingSize(marginTopSize);
      }

      return newMargin;
    }, [marginBottomSize, marginLeftSize, marginRightSize, marginTopSize]),

    style: useMemo((): CSSProperties | undefined => {
      if (typeof gap === 'undefined') {
        return;
      }

      const gapNumber: number = mapSizeToPixels(gap);
      return {
        columnGap: gapNumber,
        rowGap: gapNumber,
      };
    }, [gap]),
  };
}
