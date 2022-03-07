import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsButton = lazy(async () => import('./button.aws.view'));
const MuiButton = lazy(async () => import('./button.mui.view'));
const React95Button = lazy(async () => import('./button.react95.view'));

export default function Button(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsButton,
        [DesignSystem.Material]: MuiButton,
        [DesignSystem.React95]: React95Button,
      }}
      props={props}
    />
  );
}
