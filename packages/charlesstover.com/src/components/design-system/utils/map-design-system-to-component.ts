import type { ComponentType } from 'react';
import { lazy } from 'react';
import DesignSystem from '../../../constants/design-system';
import DesignSystemProps from '../../../types/design-system-props';

/*
We must use `as` when mapping the design system to its component, because its
  lazy definition cannot accept its generic. Instead, the generics for `Card`
  and `Row` become defined as `object`, when in fact they are still generic. The
  `as` definition returns them to their original generic form.
*/

type DesignSystemComponent<
  Card extends object,
  Row extends object,
> = ComponentType<DesignSystemProps<Card, Row>>;

const Awsui = lazy(async () => import('../../../design-systems/awsui'));
const Mui = lazy(async () => import('../../../design-systems/mui'));
const CloudscapeDesign = lazy(
  async () => import('../../../design-systems/cloudscape-design'),
);

export default function mapDesignSystemToComponent<
  Card extends object,
  Row extends object,
>(designSystem: DesignSystem): DesignSystemComponent<Card, Row> {
  switch (designSystem) {
    case DesignSystem.Awsui:
      return Awsui as DesignSystemComponent<Card, Row>;
    case DesignSystem.CloudscapeDesign:
      return CloudscapeDesign as DesignSystemComponent<Card, Row>;
    case DesignSystem.Mui:
      return Mui as DesignSystemComponent<Card, Row>;
  }
}
