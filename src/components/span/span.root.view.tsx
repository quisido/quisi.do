import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsSpan = lazy(async () => import('./span.aws.view'));
const MuiSpan = lazy(async () => import('./span.mui.view'));
const React95Span = lazy(async () => import('./span.react95.view'));

export default function Span(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsSpan,
        [DesignSystem.Material]: MuiSpan,
        [DesignSystem.React95]: React95Span,
      }}
      props={props}
    />
  );
}
