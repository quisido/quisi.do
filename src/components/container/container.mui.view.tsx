import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function MuiContainer({
  actions,
  children,
  footer,
  header,
}: Readonly<Props>): ReactElement {
  return (
    <Card>
      <CardHeader action={actions} title={header} />
      <CardContent>{children}</CardContent>
      {filterByDefined(footer) && <CardActions>{footer}</CardActions>}
    </Card>
  );
}
