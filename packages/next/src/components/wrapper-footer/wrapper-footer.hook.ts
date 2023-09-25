import { useMemo } from 'react';

interface State {
  readonly features: readonly string[];
}

export default function useWrapperFooter(): State {
  return {
    features: useMemo((): readonly string[] => {
      const newFeatures: string[] = [];

      if (typeof window === 'object' && '__coverage__' in window) {
        newFeatures.push('coverage enabled');
      }

      return newFeatures;
    }, []),
  };
}
