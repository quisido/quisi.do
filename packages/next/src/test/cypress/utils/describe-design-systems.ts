/// <reference types="cypress" />
import DESIGN_SYSTEMS from '../constants/design-systems.js';
import describeDesignSystem from './describe-design-system.js';

export default function describeDesignSystems(fn: VoidFunction): void {
  for (const designSystem of DESIGN_SYSTEMS) {
    describeDesignSystem(designSystem, fn);
  }
}
