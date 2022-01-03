import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import I18n from 'lazy-i18n';
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
                columnIndex: number,
              ): ReactElement => {
                const active: boolean = sortColumnIndex === columnIndex;

                const getDirection = (): 'asc' | 'desc' => {
                  if (!active) {
                    return 'asc';
                  }
                  if (sortAscending) {
                    return 'asc';
                  }
                  return 'desc';
                };

                const getSortDirection = (): 'asc' | 'desc' | false => {
                  if (!active) {
                    return false;
                  }
                  if (sortAscending) {
                    return 'asc';
                  }
                  return 'desc';
                };

                const direction: 'asc' | 'desc' = getDirection();
                return (
                  <TableCell
                    align={columnIndex === FIRST_INDEX ? 'left' : 'right'}
                    key={columnIndex}
                    sortDirection={getSortDirection()}
                  >
                    <TableSortLabel
                      active={active}
                      direction={direction}
                      onClick={(): void => {
                        if (active) {
                          onSort(columnIndex, !sortAscending);
                        } else {
                          onSort(columnIndex, true);
                        }
                      }}
                    >
                      {columnHeader}
                      {active && (
                        <span style={visuallyHidden}>
                          {direction === 'asc' ? (
                            <I18n>sorted ascending</I18n>
                          ) : (
                            <I18n>sorted descending</I18n>
                          )}
                        </span>
                      )}
                    </TableSortLabel>
                  </TableCell>
                );
              },
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
