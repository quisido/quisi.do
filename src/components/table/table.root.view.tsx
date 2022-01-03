import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsTable = lazy(async () => import('./table.aws.view'));
const MuiTable = lazy(async () => import('./table.mui.view'));

export default function Table<Item>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return (
    <Design<Readonly<Props<unknown>>>
      // Type 'Readonly<Props<Item>>' is not assignable to type
      //   'Readonly<Props<unknown>>'.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      props={props as Readonly<Props<unknown>>}
      components={{
        [DesignSystem.Aws]: AwsTable,
        [DesignSystem.Material]: MuiTable,
      }}
    />
  );
}
