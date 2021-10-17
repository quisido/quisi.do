import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import ROOT_BREADCRUMBS from './constants/root-breadcrumbs';

interface Props {
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
}

interface State {
  readonly breadcrumbs: readonly Readonly<Breadcrumb>[];
}

export default function useWrapper({ breadcrumbs }: Readonly<Props>): State {
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
