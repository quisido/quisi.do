import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import ROOT_BREADCRUMBS from './constants/root-breadcrumbs';

interface Props {
  readonly breadcrumbs: undefined | readonly Readonly<Breadcrumb>[];
}

interface State {
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
}

const DEFAULT_BREADCRUMBS: readonly never[] = Object.freeze([]);

export default function useWrapper({
  breadcrumbs = DEFAULT_BREADCRUMBS,
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
