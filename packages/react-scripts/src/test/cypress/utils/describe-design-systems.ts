/// <reference types="cypress" />
import DESIGN_SYSTEMS from '../constants/design-systems';
import describeDesignSystem from './describe-design-system';

export default function describeDesignSystems(fn: VoidFunction): void {
  for (const designSystem of DESIGN_SYSTEMS) {
    describeDesignSystem(designSystem, fn);
  }
}
