import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { type ReactElement } from 'react';
import { type Props } from '../../../components/section.js';

export default function MuiSection({
  actions,
  children,
  header,
}: Props): ReactElement {
  return (
    <Card>
      <CardHeader
        title={header}
        titleTypographyProps={{
          component: 'h2',
        }}
      />
      {typeof children !== 'undefined' && <CardContent>{children}</CardContent>}
      {typeof actions !== 'undefined' && <CardActions>{actions}</CardActions>}
    </Card>
  );
}
