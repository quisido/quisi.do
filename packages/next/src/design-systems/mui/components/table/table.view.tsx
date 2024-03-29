import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Body from '@mui/material/TableBody';
import Cell from '@mui/material/TableCell';
import Container from '@mui/material/TableContainer';
import Footer from '@mui/material/TableFooter';
import Head from '@mui/material/TableHead';
import Pagination, {
  type TablePaginationProps,
} from '@mui/material/TablePagination';
import MuiRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/table.js';
import mapComponentToPropMapper from '../../../../utils/map-component-to-prop-mapper.js';
import Div from '../div/index.js';
import Span from '../span/index.js';
import EmptyRows from './components/empty-rows/index.js';
import HeadCell from './components/head-cell/index.js';
import Row from './components/row/index.js';
import Subheader from './components/subheader/index.js';
import useTable from './table.hook.js';

const FIRST_PAGE = 1;
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
export default function MuiTable<Item extends object>({
  Description,
  columns,
  header,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  page: pageProp = FIRST_PAGE,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions: rowsPerPageOptionsProp,
  sortAscending,
  sortColumnIndex,
  subheader,
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
  } = useTable({
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

  const paginationProps: Pick<
    TablePaginationProps,
    'onRowsPerPageChange' | 'rowsPerPageOptions'
  > = {};
  if (typeof handleRowsPerPageChange !== 'undefined') {
    paginationProps.onRowsPerPageChange = handleRowsPerPageChange;
  }
  if (typeof rowsPerPageOptionsState !== 'undefined') {
    paginationProps.rowsPerPageOptions = rowsPerPageOptionsState;
  }

  return (
    <>
      {showToolbar && (
        <Toolbar variant="dense">
          <Div
            display="flex"
            flexDirection="column"
            marginBottom="small"
            marginTop="medium"
            textAlign="left"
          >
            <Typography component="div" variant="h6">
              {header}
            </Typography>
            <Subheader>{subheader}</Subheader>
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
      {typeof loading !== 'string' &&
        typeof handlePageChange !== 'undefined' && (
          <Pagination
            backIconButtonProps={backIconButtonProps}
            component="div"
            count={rowsCount}
            nextIconButtonProps={nextIconButtonProps}
            onPageChange={handlePageChange}
            page={pageState}
            rowsPerPage={rowsPerPage}
            {...paginationProps}
          />
        )}
    </>
  );
}
