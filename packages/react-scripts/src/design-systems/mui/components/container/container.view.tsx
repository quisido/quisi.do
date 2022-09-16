import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import type { CardContentProps } from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/container';
import Div from '../div';

export default function MuiContainer({
  actions,
  children,
  className,
  footer,
  header,
  marginTop,
}: Readonly<Props>): ReactElement {
  const cardContentProps: CardContentProps = {};
  if (typeof className !== 'undefined') {
    cardContentProps.className = className;
  }

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
          <CardContent {...cardContentProps}>{children}</CardContent>
        )}
        {typeof footer !== 'undefined' && <CardActions>{footer}</CardActions>}
      </Card>
    </Div>
  );
}
