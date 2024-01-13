'use client';

import { type ReactElement, Suspense } from 'react';
import useDesignSystem from './design-system.hook.js';
import type Props from './types/props.js';

export default function DesignSystem<Card extends object, Row extends object>(
  props: Readonly<Props<Card, Row>>,
): ReactElement {
  const { Component, fallback } = useDesignSystem(props);

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}
