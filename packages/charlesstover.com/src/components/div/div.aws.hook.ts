import type { BoxProps } from '@awsui/components-react/box';
import { useMemo } from 'react';
import isDefined from '../../utils/is-defined';
import isUndefined from '../../utils/is-undefined';
import validateString from '../../utils/validate-string';
import styles from './div.aws.module.scss';
import mapSizeToAwsSpacingSize from './utils/map-size-to-aws-spacing-size';

interface Props {
  readonly className: string | undefined;
  readonly display: 'block' | 'flex' | undefined;
  readonly element: 'h2' | 'h3' | 'h4' | 'p' | undefined;
  readonly flexDirection:
    | 'column-reverse'
    | 'column'
    | 'row-reverse'
    | 'row'
    | undefined;
  readonly flexWrap: 'nowrap' | 'wrap' | undefined;
  readonly justifyContent: 'space-around' | 'space-between' | undefined;
  readonly margin: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
  readonly marginX: 'large' | 'medium' | 'small' | undefined;
  readonly marginY: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly className: string | undefined;
  readonly display: BoxProps.Display | undefined;
  readonly margin: BoxProps.Spacing | undefined;
  readonly variant: 'h2' | 'h3' | 'h4' | 'p' | undefined;
}

const displayFlexClassName: string = validateString(styles.displayFlex);
const EMPTY = 0;
const flexWrapNowrapClassName: string = validateString(styles.flexWrapNowrap);
const flexWrapWrapClassName: string = validateString(styles.flexWrapWrap);

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

export default function useAwsDiv({
  className,
  display,
  element,
  flexDirection,
  flexWrap,
  justifyContent,
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
    }, [className, display, flexDirection, flexWrap, justifyContent]),

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
        isUndefined(marginBottomSize) &&
        isUndefined(marginLeftSize) &&
        isUndefined(marginRightSize) &&
        isUndefined(marginTopSize)
      ) {
        return;
      }

      const newMargin: BoxProps.Spacing = {};
      if (isDefined(marginBottomSize)) {
        newMargin.bottom = mapSizeToAwsSpacingSize(marginBottomSize);
      }
      if (isDefined(marginLeftSize)) {
        newMargin.left = mapSizeToAwsSpacingSize(marginLeftSize);
      }
      if (isDefined(marginRightSize)) {
        newMargin.right = mapSizeToAwsSpacingSize(marginRightSize);
      }
      if (isDefined(marginTopSize)) {
        newMargin.top = mapSizeToAwsSpacingSize(marginTopSize);
      }

      return newMargin;
    }, [marginBottomSize, marginLeftSize, marginRightSize, marginTopSize]),
  };
}
