import { Frame, TitleBar } from '@react95/core';
import type { Key, ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function React95Cards<Item>({
  CardContent,
  CardFooter,
  CardHeader,
  cardKey,
  header,
  items,
}: Readonly<Props<Item>>): ReactElement {
  return (
    <div style={{ float: 'left' }}>
      <TitleBar title={header as unknown as string} />
      {items.map(
        (item: Item): ReactElement => (
          <Frame key={item[cardKey] as unknown as Key}>
            {filterByDefined(CardHeader) && (
              <TitleBar
                title={(<CardHeader {...item} />) as unknown as string}
              />
            )}
            <CardContent {...item} />
            {filterByDefined(CardFooter) && <CardFooter {...item} />}
          </Frame>
        ),
      )}
    </div>
  );
}
