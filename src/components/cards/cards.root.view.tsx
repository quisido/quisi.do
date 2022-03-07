import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsCards = lazy(async () => import('./cards.aws.view'));
const MuiCards = lazy(async () => import('./cards.mui.view'));
const React95Cards = lazy(async () => import('./cards.react95.view'));

export default function Cards<Item>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return (
    <Design<Readonly<Props<unknown>>>
      // Type 'Readonly<Props<Item>>' is not assignable to type
      //   'Readonly<Props<unknown>>'.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      components={{
        [DesignSystem.Aws]: AwsCards,
        [DesignSystem.Material]: MuiCards,
        [DesignSystem.React95]: React95Cards,
      }}
      props={props as Readonly<Props<unknown>>}
    />
  );
}
