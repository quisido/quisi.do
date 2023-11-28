'use client';

import { type ReactElement } from 'react';
import type Props from '../../types/props';

export default function FallbackHeader({ children }: Props): ReactElement {
  return <h2>{children}</h2>;
}
