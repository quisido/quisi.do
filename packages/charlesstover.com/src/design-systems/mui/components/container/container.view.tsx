import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/container';
import Div from '../div';

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
        <CardHeader
          action={actions}
          title={header}
          titleTypographyProps={{
            component: 'h2',
          }}
        />
        {typeof children !== 'undefined' && (
          <CardContent>{children}</CardContent>
        )}
        {typeof footer !== 'undefined' && <CardActions>{footer}</CardActions>}
      </Card>
    </Div>
  );
}
