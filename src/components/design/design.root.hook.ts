import type { ComponentType } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesignSystem from '../../hooks/use-design-system';

export default function useDesign<P>(
  components: Readonly<Record<DesignSystem, ComponentType<P>>>,
): ComponentType<P> {
  const designSystem: DesignSystem = useDesignSystem();
  return components[designSystem];
}
