import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import MuiContent from '@mui/material/CardContent';
import MuiHeader from '@mui/material/CardHeader';
import type { ReactElement } from 'react';
import isDefined from '../../../../utils/is-defined';
import validateString from '../../../../utils/validate-string';
import type Props from '../../types/mui-card-props';
import styles from './mui-card.module.scss';

const rootClassName: string = validateString(styles.root);

export default function MuiCard<Item extends Record<string, unknown>>({
  Content,
  Footer,
  Header,
  item,
}: Readonly<Props<Item>>): ReactElement {
  return (
    <Card className={rootClassName}>
      {isDefined(Header) && <MuiHeader title={<Header {...item} />} />}
      <MuiContent>
        <Content {...item} />
      </MuiContent>
      {isDefined(Footer) && (
        <CardActions>
          <Footer {...item} />
        </CardActions>
      )}
    </Card>
  );
}
