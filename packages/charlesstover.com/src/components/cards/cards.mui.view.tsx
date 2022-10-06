import type { ReactElement } from 'react';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import validateString from '../../utils/validate-string';
import useMuiCards from './cards.mui.hook';
import MuiCard from './components/mui-card';
import type CardProps from './types/mui-card-props';
import type Props from './types/props';
import styles from './cards.mui.module.scss';

const rootClassName: string = validateString(styles.root);

export default function MuiCards<Item extends Record<string, unknown>>({
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
  const mapCardPropsToElement =
    mapComponentToPropMapper<CardProps<Item>>(MuiCard);
  return (
    <>
      {header}
      <div className={rootClassName}>
        {cardProps.map(mapCardPropsToElement)}
      </div>
    </>
  );
}
