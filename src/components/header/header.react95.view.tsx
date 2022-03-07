import { TitleBar } from '@react95/core';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function React95Header({
  actions,
  children,
}: Readonly<Props>): ReactElement {
  return (
    <TitleBar title={children as unknown as string}>
      {filterByDefined(actions) && (
        <TitleBar.OptionsBox>{actions}</TitleBar.OptionsBox>
      )}
    </TitleBar>
  );
}
