import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import type DesignSystem from '../constants/design-system';
import DesignSystemContext from '../contexts/design-system';

const MISSING_DESIGN_SYSTEM_CONTEXT_ERROR: Error = new Error(
  'Expected the design system context to be provided.',
);

export default function useDesignSystem(): [
  DesignSystem,
  Dispatch<SetStateAction<DesignSystem>>,
] {
  const designSystem:
    | [DesignSystem, Dispatch<SetStateAction<DesignSystem>>]
    | null = useContext(DesignSystemContext);

  if (designSystem === null) {
    throw MISSING_DESIGN_SYSTEM_CONTEXT_ERROR;
  }

  return designSystem;
}
