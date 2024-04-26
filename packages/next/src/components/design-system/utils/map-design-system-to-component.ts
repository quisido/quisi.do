import { lazy, type ComponentType } from 'react';
import DesignSystem from '../../../constants/design-system.js';
import type DesignSystemProps from '../../../types/design-system-props.js';

/*
 *   We must use `as` when mapping the design system to its component, because
 * its lazy definition cannot accept its generic. Instead, the generics for
 * `Card` and `Row` become defined as `object`, when in fact they are still
 * generic. The `as` definition returns them to their original generic form.
 */

type DesignSystemComponent<
  Card extends object,
  Row extends object,
> = ComponentType<DesignSystemProps<Card, Row>>;

const Mui = lazy(async () => import('../../../design-systems/mui/index.js'));
const Quisi = lazy(async () => import('../../../design-systems/quisi.js'));

export default function mapDesignSystemToComponent<
  Card extends object,
  Row extends object,
>(designSystem: DesignSystem): DesignSystemComponent<Card, Row> {
  switch (designSystem) {
    case DesignSystem.Mui:
      return Mui as DesignSystemComponent<Card, Row>;
    case DesignSystem.Quisi:
      return Quisi as DesignSystemComponent<Card, Row>;
  }
}
