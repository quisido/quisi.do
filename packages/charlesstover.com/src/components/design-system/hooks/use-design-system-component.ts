import type { ComponentType } from 'react';
import useDesignSystem from '../../../hooks/use-design-system';
import DesignSystemProps from '../../../types/design-system-props';
import mapDesignSystemToComponent from '../utils/map-design-system-to-component';

export default function useDesignSystemComponent<
  Card extends object,
  Row extends object,
>(): ComponentType<DesignSystemProps<Card, Row>> {
  // Contexts
  const [designSystem] = useDesignSystem();

  return mapDesignSystemToComponent(designSystem);
}
