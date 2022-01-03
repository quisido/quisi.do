import type { Palette } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const mapPaletteToBackgroundColor = ({ mode, primary }: Palette): string => {
  if (mode === 'dark') {
    return primary.dark;
  }
  return primary.light;
};

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const MuiTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: mapPaletteToBackgroundColor(theme.palette),
    color: theme.palette.common.white,

    '& .Mui-active, & .Mui-active svg': {
      color: theme.palette.common.white,
    },

    '& .MuiTableSortLabel-root:hover, & .MuiTableSortLabel-root:hover svg': {
      color: theme.palette.common.white,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default MuiTableCell;
