import { useMemo } from 'react';
import filterByCoverageWindow from '../../utils/filter-by-coverage-window';

interface State {
  readonly features: readonly string[];
}

export default function useWrapperFooter(): State {
  return {
    features: useMemo((): readonly string[] => {
      const newFeatures: string[] = [];

      if (filterByCoverageWindow(window)) {
        newFeatures.push('coverage enabled');
      }

      return newFeatures;
    }, []),
  };
}
