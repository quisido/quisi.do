import { styled } from '@mui/material/styles';
import MuiCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { type ReactElement } from 'react';
import mapComponentToPropMapper from '../../../../../../utils/map-component-to-prop-mapper.js';
import validateString from '../../../../../../utils/validate-string.js';
import type Props from '../../types/row-props.js';
import Cell from '../cell/index.js';
import styles from './row.module.scss';

const rootDescribedClassName: string = validateString(styles['described']);
const mapCellPropsToComponent = mapComponentToPropMapper(Cell);
const rootClassName: string = validateString(styles['root']);
const descriptionCellClassName: string = validateString(
  styles['descriptionCell'],
);

const describedClassNames: readonly string[] = [
  rootClassName,
  rootDescribedClassName,
];

const describedClassName: string = describedClassNames.join(' ');

const DescribedStyledRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(4n), &:nth-of-type(4n - 1)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function MuiTableRow({
  Description,
  cellProps,
}: Props): ReactElement {
  if (typeof Description !== 'undefined') {
    return (
      <>
        <DescribedStyledRow className={describedClassName}>
          {cellProps.map(mapCellPropsToComponent)}
        </DescribedStyledRow>
        <DescribedStyledRow className={rootClassName}>
          <MuiCell
            className={descriptionCellClassName}
            colSpan={cellProps.length}
          >
            <Description />
          </MuiCell>
        </DescribedStyledRow>
      </>
    );
  }

  return (
    <StyledRow className={rootClassName}>
      {cellProps.map(mapCellPropsToComponent)}
    </StyledRow>
  );
}
