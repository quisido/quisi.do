import type { CSSProperties } from 'react';
import useParamsMemo from 'use-params-memo';
import mapIconToStyle from './utils/map-icon-to-style';

interface Props {
  readonly icon: string;
}

interface State {
  readonly style: CSSProperties;
}

export default function useProjectListItem({ icon }: Props): State {
  return {
    style: useParamsMemo(mapIconToStyle, [icon]),
  };
}
