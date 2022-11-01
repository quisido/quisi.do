import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsTable = lazy(async () => import('./table.aws.view'));
const CloudscapeTable = lazy(async () => import('./table.cloudscape.view'));
const MuiTable = lazy(async () => import('./table.mui.view'));

export default function Table<Item extends Record<string, unknown>>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsTable,
        [DesignSystem.Cloudscape]: CloudscapeTable,
        [DesignSystem.Material]: MuiTable,
      }}
      props={props as Readonly<Props<Record<string, unknown>>>}
    />
  );
}
