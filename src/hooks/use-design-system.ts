import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import type DesignSystem from '../constants/design-system';
import DesignSystemContext from '../contexts/design-system';

export default function useDesignSystem(): [
  DesignSystem,
  Dispatch<SetStateAction<DesignSystem>>,
] {
  return useContext(DesignSystemContext);
}
