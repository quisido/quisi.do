'use client';

import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import ROOT_BREADCRUMBS from './constants/root-breadcrumbs';
import EMPTY_ARRAY from '../../constants/empty-array';

interface Props {
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[] | undefined;
}

interface State {
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
}

export default function useWrapper({
  breadcrumbs = EMPTY_ARRAY,
}: Readonly<Props>): State {
  return {
    breadcrumbs: useMemo(
      (): readonly Readonly<Breadcrumb>[] => [
        ...ROOT_BREADCRUMBS,
        ...breadcrumbs,
      ],
      [breadcrumbs],
    ),
  };
}
