import type { ReactNode } from 'react';
import type { RequiredReactNode } from './required-react-node.js';

export interface RegionProps {
  readonly children: ReactNode;
  /** describes the purpose of the content in the region */
  readonly heading: RequiredReactNode;
}
