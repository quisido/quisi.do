import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type TableColumn from '../../types/table-column';
import EmptyRows from './components/mui-empty-rows';
import TableCell from './components/mui-table-cell';
import TableRow from './components/mui-table-row';
import useMuiTable from './table.mui.hook';
import type Props from './types/props';

const ARRAY_INDEX_OFFSET = 1;
const FIRST_INDEX = 0;

export default function MuiTable<Item>({
  Description,
  columns,
  filter,
  filterPlaceholder,
  header,
  loading,
  onFilterChange,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onVisibleColumnsChange,
  page,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions: rowsPerPageOptionsProp,
  sortAscending,
  sortColumnIndex,
  visibleColumnIndices,
}: Readonly<Props<Item>>): ReactElement {
  const {
    handlePageChange,
    handleRowsPerPageChange,
    rowsPerPageOptions: rowsPerPageOptionsState,
  } = useMuiTable({
    columns,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions: rowsPerPageOptionsProp,
  });

  console.log(
    Description,
    filter,
    filterPlaceholder,
    loading,
    onFilterChange,
    onSort,
    onVisibleColumnsChange,
    rows,
    sortAscending,
    sortColumnIndex,
    visibleColumnIndices,
  );

  return (
    <TableContainer component={Paper}>
      <Toolbar>
        <Typography component="div" sx={{ flex: '1 1 100%' }} variant="h6">
          {header}
        </Typography>
        {/*
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        */}
      </Toolbar>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(
              (
                { header: columnHeader }: TableColumn<Item>,
                index: number,
              ): ReactElement => (
                <TableCell
                  align={index === FIRST_INDEX ? 'left' : 'right'}
                  key={index}
                >
                  {columnHeader}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row: Item, rowIndex: number): ReactElement => (
              <TableRow key={rowIndex}>
                {columns.map(
                  (
                    { Cell }: TableColumn<Item>,
                    columnIndex: number,
                  ): ReactElement => (
                    <TableCell
                      align={columnIndex === FIRST_INDEX ? 'left' : 'right'}
                      key={columnIndex}
                    >
                      <Cell {...row} />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ),
          )}
          <EmptyRows
            colSpan={columns.length}
            page={page}
            rowsCount={rowsCount}
            rowsPerPage={rowsPerPage}
          />
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rowsCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page - ARRAY_INDEX_OFFSET}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptionsState}
      />
    </TableContainer>
  );
}
