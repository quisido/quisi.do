export default interface MuiTableHeadCellProps {
  readonly active: boolean;
  readonly align: 'left' | 'right';
  readonly ascending: boolean;
  readonly header: string;
  readonly onSort: (ascending: boolean) => void;
}
