import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsCards = lazy(async () => import('./cards.aws.view'));
const CloudscapeCards = lazy(async () => import('./cards.cloudscape.view'));
const MuiCards = lazy(async () => import('./cards.mui.view'));

export default function Cards<Item extends Record<string, unknown>>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsCards,
        [DesignSystem.Cloudscape]: CloudscapeCards,
        [DesignSystem.Material]: MuiCards,
      }}
      props={props as Readonly<Props<Record<string, unknown>>>}
    />
  );
}
