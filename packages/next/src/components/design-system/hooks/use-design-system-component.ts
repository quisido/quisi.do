import { type ComponentType } from 'react';
import { useDesignSystem } from '../../../contexts/design-system.js';
import type DesignSystemProps from '../../../types/design-system-props.js';
import mapDesignSystemToComponent from '../utils/map-design-system-to-component.js';

export default function useDesignSystemComponent<
  Card extends object,
  Row extends object,
>(): ComponentType<DesignSystemProps<Card, Row>> {
  // Contexts
  const [designSystem] = useDesignSystem();

  return mapDesignSystemToComponent(designSystem);
}
