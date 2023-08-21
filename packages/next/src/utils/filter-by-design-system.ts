import DesignSystem from '../constants/design-system';

const DESIGN_SYSTEMS: Set<unknown> = new Set(Object.values(DesignSystem));

export default function filterByDesignSystem(
  value: unknown,
): value is DesignSystem {
  return DESIGN_SYSTEMS.has(value);
}
