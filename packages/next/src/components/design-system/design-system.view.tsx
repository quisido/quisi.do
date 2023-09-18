'use client';

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import useDesignSystem from './design-system.hook';
import type Props from './types/props';

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
