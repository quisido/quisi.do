import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import type Props from './types/props';

export default function MuiDisplay({
  actions,
  children,
  footer,
  header,
}: Readonly<Props>): ReactElement {
  return (
    <Card>
      <CardHeader action={actions} title={header} />
      <CardContent>{children}</CardContent>
      {typeof footer !== 'undefined' && <CardActions>{footer}</CardActions>}
    </Card>
  );
}
