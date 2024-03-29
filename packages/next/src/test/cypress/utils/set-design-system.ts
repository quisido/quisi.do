/// <reference types="cypress" />
import select from './select.js';

const EXPANDO_SELECTOR = '*[role="button"]';
const NAVIGATION_ITEM_SELECTOR = 'nav ul > li';

export default function setDesignSystem(designSystem: string): void {
  beforeEach((): void => {
    cy.get(EXPANDO_SELECTOR).contains('Settings').click({
      scrollBehavior: 'center',
    });

    const handleIgnore = (): void => {
      cy.log(`${designSystem} design system appears to be cached.`);
    };

    select('Design system', designSystem, {
      onIgnore: handleIgnore,
      parentSelector: NAVIGATION_ITEM_SELECTOR,
    });
  });
}
