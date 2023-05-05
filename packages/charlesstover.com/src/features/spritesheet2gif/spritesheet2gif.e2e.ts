/// <reference types="cypress" />
import describeFeature from '../../test/cypress/utils/describe-feature';

const shouldDisplayCriticalElements = (): void => {
  cy.contains('nav', 'Sprite sheet to GIF');
  cy.contains('h2', 'Animate a sprite sheet');
};

describeFeature('Sprite sheet 2 GIF', '/spritesheet2gif', (): void => {
  // We do not test all design systems, since this feature only supports AWS UI.
  // Whenever we add support for all other design systems, we can merge
  //   `describeDesignSystems` into `describeFeature`.
  it('should display critical elements', shouldDisplayCriticalElements);
});
