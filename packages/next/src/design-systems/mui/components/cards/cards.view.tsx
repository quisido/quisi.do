import { type ReactElement } from 'react';
import { type Props } from '../../../../components/cards/index.js';
import mapComponentToPropMapper from '../../../../utils/map-component-to-prop-mapper.js';
import validateString from '../../../../utils/validate-string.js';
import useMuiCards from './cards.hook.js';
import styles from './cards.module.scss';
import Card, { type Props as CardProps } from './components/card/index.js';

const rootClassName: string = validateString(styles['root']);

export default function MuiCards<Item extends object>({
  CardContent,
  CardFooter,
  CardHeader,
  cardKey,
  header,
  items,
}: Readonly<Props<Item>>): ReactElement {
  const { cardProps } = useMuiCards({
    CardContent,
    CardFooter,
    CardHeader,
    cardKey,
    items,
  });

  // Technical debt: This function can be defined at the module scope, but when
  //   done, TypeScript cannot infer the prop type as `Item` and incorrectly
  //   fails.
  const mapCardPropsToElement = mapComponentToPropMapper<CardProps<Item>>(Card);
  return (
    <>
      {header}
      <div className={rootClassName}>
        {cardProps.map(mapCardPropsToElement)}
      </div>
    </>
  );
}
