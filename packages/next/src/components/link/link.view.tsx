import type { ReactElement } from 'react';
import DesignSystem from '../design-system';
import Fallback from './components/fallback';
import type Props from './types/props';

export default function Link(props: Readonly<Props>): ReactElement {
  return <DesignSystem Fallback={Fallback} props={props} type="link" />;
}
