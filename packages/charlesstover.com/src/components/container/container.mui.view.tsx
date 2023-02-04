import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
import Div from '../div';
import type Props from './types/props';

export default function MuiContainer({
  actions,
  children,
  footer,
  header,
  marginTop,
}: Readonly<Props>): ReactElement {
  return (
    <Div marginTop={marginTop}>
      <Card>
        <CardHeader action={actions} title={header} />
        {findDefined(children) && <CardContent>{children}</CardContent>}
        {findDefined(footer) && <CardActions>{footer}</CardActions>}
      </Card>
    </Div>
  );
}
