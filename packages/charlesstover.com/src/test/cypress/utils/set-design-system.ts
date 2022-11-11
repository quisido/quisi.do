import select from './select';

const EXPANDO_SELECTOR = '*[role="button"]';
const NAVIGATION_ITEM_SELECTOR = 'nav ul > li';

export default function setDesignSystem(designSystem: string): void {
  beforeEach((): void => {
    cy.get(EXPANDO_SELECTOR).contains('Settings').click();

    select('Design system', designSystem, {
      parentSelector: NAVIGATION_ITEM_SELECTOR,
    });

    // Wait for the previous design system to unmount.
    cy.get('body')
      .invoke('text')
      .should('not.contain.text', 'CharlesStover.com');

    // Wait for the new design system to mount.
    cy.get('body').invoke('text').should('contain.text', 'CharlesStover.com');
  });
}
