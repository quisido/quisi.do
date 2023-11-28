/// <reference types="cypress" />
import setDesignSystem from './set-design-system';

export default function describeDesignSystem(
  designSystem: string,
  fn: VoidFunction,
): void {
  describe(designSystem, (): void => {
    setDesignSystem(designSystem);
    fn();
  });
}
