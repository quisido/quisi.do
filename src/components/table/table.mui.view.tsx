import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Body from '@mui/material/TableBody';
import Cell from '@mui/material/TableCell';
import Container from '@mui/material/TableContainer';
import Head from '@mui/material/TableHead';
import Pagination from '@mui/material/TablePagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type TableColumn from '../../types/table-column';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import EmptyRows from './components/mui-empty-rows';
import HeadCell from './components/mui-head-cell';
import Row from './components/mui-row';
import useMuiTable from './table.mui.hook';
import type Props from './types/props';

const FIRST_INDEX = 0;
const mapHeadCellPropsToComponent = mapComponentToPropMapper(HeadCell);

/*
Description,
filter,
filterPlaceholder,
loading,
onFilterChange,
onVisibleColumnsChange,
visibleColumnIndices,
*/
export default function MuiTable<Item>({
  columns,
  header,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  page: pageProp,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions: rowsPerPageOptionsProp,
  sortAscending,
  sortColumnIndex,
}: Readonly<Props<Item>>): ReactElement {
  const {
    handlePageChange,
    handleRowsPerPageChange,
    headCellProps,
    page: pageState,
    rowsPerPageOptions: rowsPerPageOptionsState,
  } = useMuiTable({
    columns,
    onPageChange,
    onRowsPerPageChange,
    onSort,
    page: pageProp,
    rowsPerPageOptions: rowsPerPageOptionsProp,
    sortAscending,
    sortColumnIndex,
  });

  return (
    <Container component={Paper}>
      <Toolbar>
        <Typography component="div" variant="h6">
          {header}
        </Typography>
      </Toolbar>
      <Table size="small" stickyHeader>
        <Head>
          <Row>{headCellProps.map(mapHeadCellPropsToComponent)}</Row>
        </Head>
        <Body>
          {rows.map(
            (row: Item, rowIndex: number): ReactElement => (
              <Row key={rowIndex}>
                {columns.map(
                  (
                    { CellContent }: TableColumn<Item>,
                    columnIndex: number,
                  ): ReactElement => (
                    <Cell
                      align={columnIndex === FIRST_INDEX ? 'left' : 'right'}
                      key={columnIndex}
                    >
                      <CellContent {...row} />
                    </Cell>
                  ),
                )}
              </Row>
            ),
          )}
          <EmptyRows
            colSpan={columns.length}
            page={pageProp}
            rowsCount={rowsCount}
            rowsPerPage={rowsPerPage}
          />
        </Body>
      </Table>
      <Pagination
        component="div"
        count={rowsCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={pageState}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptionsState}
      />
    </Container>
  );
}
