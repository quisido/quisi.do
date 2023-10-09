import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { type ReactElement } from 'react';

interface Props {
  readonly colSpan: number;
  readonly page: number;
  readonly rowsCount: number;
  readonly rowsPerPage: number;
}

const BORDER_WIDTH = 1;
const HEIGHT = 54;

export default function MuiTableEmptyRows({
  colSpan,
  page,
  rowsCount,
  rowsPerPage,
}: Props): ReactElement | null {
  const pages: number = Math.ceil(rowsCount / rowsPerPage);
  if (page < pages) {
    return null;
  }

  const emptyRowCount: number = rowsPerPage - (rowsCount % rowsPerPage);
  if (emptyRowCount === rowsPerPage) {
    return null;
  }

  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        style={{
          height: HEIGHT * emptyRowCount + BORDER_WIDTH,
        }}
      />
    </TableRow>
  );
}
