import { type ReactElement } from 'react';
import DesignSystem from '../design-system/index.js';

const PROPS: Readonly<Record<string, never>> = Object.freeze({});

export default function LoadingIcon(): ReactElement {
  return <DesignSystem props={PROPS} type="loading-icon" />;
}
