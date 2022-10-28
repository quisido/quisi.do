/// <reference types="cypress" />

describe('Sprite sheet 2 GIF', (): void => {
  it('should display critical elements', (): void => {
    cy.visit('/spritesheet2gif');
    cy.contains('nav', 'Sprite sheet to GIF');
    cy.contains('h2', 'Animate a sprite sheet');
  });
});

export default null;
