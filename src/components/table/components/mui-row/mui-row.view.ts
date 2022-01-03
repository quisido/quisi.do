import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const MuiTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    borderWidth: 0,
  },
}));

export default MuiTableRow;
