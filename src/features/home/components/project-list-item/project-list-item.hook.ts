import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import mapIconToStyle from '../../utils/map-icon-to-style';

interface Props {
  readonly icon: string;
}

interface State {
  readonly style: CSSProperties;
}

export default function useProjectListItem({ icon }: Props): State {
  return {
    style: useMemo((): CSSProperties => {
      return mapIconToStyle(icon);
    }, [icon]),
  };
}
