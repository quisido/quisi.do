import { type ReactElement } from 'react';
import DesignSystem from '../design-system';
import Fallback from './components/fallback';
import type Props from './types/props';

export default function Header(props: Props): ReactElement {
  return <DesignSystem Fallback={Fallback} props={props} type="header" />;
}
