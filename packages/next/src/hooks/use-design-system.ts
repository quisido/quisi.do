import { type Dispatch, type SetStateAction, useContext } from 'react';
import type DesignSystem from '../constants/design-system.js';
import DesignSystemContext from '../contexts/design-system.js';

export default function useDesignSystem(): [
  DesignSystem,
  Dispatch<SetStateAction<DesignSystem>>,
] {
  const designSystem:
    | [DesignSystem, Dispatch<SetStateAction<DesignSystem>>]
    | null = useContext(DesignSystemContext);

  if (designSystem === null) {
    throw new Error('Expected the design system context to be provided.');
  }

  return designSystem;
}
