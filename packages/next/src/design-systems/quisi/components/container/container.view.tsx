import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/container';
import Div from '../div';

export default function MuiContainer({
  actions,
  children,
  className,
  footer,
  header,
  headerClassName,
  marginTop,
  subheader,
}: Props): ReactElement {
  const cardContentProps: CardContentProps = {};
  if (typeof className !== 'undefined') {
    cardContentProps.className = className;
  }

  return (
    <Div marginTop={marginTop}>
      <Card>
        <CardHeader
          action={actions}
          className={headerClassName}
          subheader={subheader}
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
