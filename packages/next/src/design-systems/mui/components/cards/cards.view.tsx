import type { ReactElement } from 'react';
import type { Props } from '../../../../components/cards';
import mapComponentToPropMapper from '../../../../utils/map-component-to-prop-mapper';
import validateString from '../../../../utils/validate-string';
import useMuiCards from './cards.hook';
import styles from './cards.module.scss';
import type { Props as CardProps } from './components/card';
import Card from './components/card';

const rootClassName: string = validateString(styles.root);

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
