/// <reference types="cypress" />
import describeViewports from './describe-viewports.js';

export default function describeFeature(
  title: string,
  url: string,
  fn: VoidFunction,
): void {
  describe(title, (): void => {
    describeViewports((): void => {
      beforeEach((): void => {
        cy.visit(url);
      });

      fn();
    });
  });
}
