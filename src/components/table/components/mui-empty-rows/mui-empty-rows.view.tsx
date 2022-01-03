import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { ReactElement } from 'react';

interface Props {
  readonly colSpan: number;
  readonly page: number;
  readonly rowsCount: number;
  readonly rowsPerPage: number;
}

const SMALL_SIZE_HEIGHT = 33;

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
    <TableRow
      style={{
        height: SMALL_SIZE_HEIGHT * emptyRowCount,
      }}
    >
      <TableCell colSpan={colSpan} />
    </TableRow>
  );
}
