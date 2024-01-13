import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import MuiContent from '@mui/material/CardContent';
import MuiHeader from '@mui/material/CardHeader';
import { type ComponentType, type ReactElement } from 'react';
import validateString from '../../../../../../utils/validate-string.js';
import styles from './card.module.scss';

export interface Props<Item extends object> {
  readonly Content: ComponentType<Item>;
  readonly Footer: ComponentType<Item> | undefined;
  readonly Header: ComponentType<Item> | undefined;
  readonly item: Item;
}

const rootClassName: string = validateString(styles['root']);

export default function MuiCard<Item extends object>({
  Content,
  Footer,
  Header,
  item,
}: Readonly<Props<Item>>): ReactElement {
  return (
    <Card className={rootClassName}>
      {typeof Header !== 'undefined' && (
        <MuiHeader title={<Header {...item} />} />
      )}
      <MuiContent>
        <Content {...item} />
      </MuiContent>
      {typeof Footer !== 'undefined' && (
        <CardActions>
          <Footer {...item} />
        </CardActions>
      )}
    </Card>
  );
}
