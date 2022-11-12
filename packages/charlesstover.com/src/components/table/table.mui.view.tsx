import Cell from '@mui/material/TableCell';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Body from '@mui/material/TableBody';
import Container from '@mui/material/TableContainer';
import Footer from '@mui/material/TableFooter';
import Head from '@mui/material/TableHead';
import Pagination from '@mui/material/TablePagination';
import MuiRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import Div from '../../components/div';
import Span from '../../components/span';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import EmptyRows from './components/mui-empty-rows';
import HeadCell from './components/mui-head-cell';
import Row from './components/mui-row';
import useMuiTable from './table.mui.hook';
import type Props from './types/props';

const mapHeadCellPropsToComponent = mapComponentToPropMapper(HeadCell);
const mapRowPropsToComponent = mapComponentToPropMapper(Row);

/*
filter,
filterPlaceholder,
header,
onFilterChange,
onVisibleColumnsChange,
visibleColumnIndices,
*/
export default function MuiTable<Item extends Record<string, unknown>>({
  Description,
  columns,
  header,
  loading,
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
    backIconButtonProps,
    handlePageChange,
    handleRowsPerPageChange,
    headCellProps,
    nextIconButtonProps,
    page: pageState,
    rowsPerPageOptions: rowsPerPageOptionsState,
    rowProps,
    showToolbar,
  } = useMuiTable({
    Description,
    columns,
    onPageChange,
    onRowsPerPageChange,
    onSort,
    page: pageProp,
    rows,
    rowsPerPageOptions: rowsPerPageOptionsProp,
    sortAscending,
    sortColumnIndex,
  });

  return (
    <>
      {showToolbar && (
        <Toolbar variant="dense">
          <Div display="flex" flexDirection="column" textAlign="left">
            <Typography component="div" variant="h6">
              {header}
            </Typography>
          </Div>
        </Toolbar>
      )}
      <Container component={Paper}>
        <Table size="small" stickyHeader>
          <Head>
            <MuiRow>{headCellProps.map(mapHeadCellPropsToComponent)}</MuiRow>
          </Head>
          <Body>
            {typeof loading === 'string' ? (
              <MuiRow>
                <Cell colSpan={columns.length}>
                  <Div textAlign="center">
                    <Span color="label" size="medium">
                      {loading}
                    </Span>
                  </Div>
                </Cell>
              </MuiRow>
            ) : (
              <>
                {rowProps.map(mapRowPropsToComponent)}
                <EmptyRows
                  colSpan={columns.length}
                  page={pageProp}
                  rowsCount={rowsCount}
                  rowsPerPage={rowsPerPage}
                />
              </>
            )}
          </Body>
          {typeof loading === 'string' && (
            <Footer>
              <MuiRow>
                <Cell colSpan={columns.length}>
                  <LinearProgress />
                </Cell>
              </MuiRow>
            </Footer>
          )}
        </Table>
      </Container>
      {typeof loading !== 'string' && (
        <Pagination
          backIconButtonProps={backIconButtonProps}
          component="div"
          count={rowsCount}
          nextIconButtonProps={nextIconButtonProps}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={pageState}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptionsState}
        />
      )}
    </>
  );
}
