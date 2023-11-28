/// <reference types="cypress" />

export default function describeViewport(
  width: number,
  height: number,
  fn: VoidFunction,
): void {
  describe(`${width}x${height}`, (): void => {
    before((): void => {
      cy.viewport(width, height);
    });

    fn();
  });
}
